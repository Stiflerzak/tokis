"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/prisma";
import { Prisma } from '@prisma/client'; 
import { createClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { serializeCarData } from "@/lib/helpers";
import sharp from "sharp";

// Function to convert File to base64
async function fileToBase64(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString("base64");
}

// Gemini AI integration for car image processing
// export async function processCarImageWithAI(file) {
//   try {
//     // Check if API key is available
//     if (!process.env.GEMINI_API_KEY) {
//       throw new Error("Gemini API key is not configured");
//     }

//     // Initialize Gemini API
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     // Convert image file to base64
//     const base64Image = await fileToBase64(file);

//     // Create image part for the model
//     const imagePart = {
//       inlineData: {
//         data: base64Image,
//         mimeType: file.type,
//       },
//     };

//     // Define the prompt for car detail extraction
//     const prompt = `
//       Analyze this car image and extract the following information:
//       1. Make (manufacturer)
//       2. Model
//       3. Year (approximately)
//       4. Color
//       5. Body type (SUV, Sedan, Hatchback, etc.)
//       6. Mileage
//       7. Fuel type (your best guess)
//       8. Transmission type (your best guess)
//       9. Price (your best guess)
//       9. Short Description as to be added to a car listing

//       Format your response as a clean JSON object with these fields:
//       {
//         "make": "",
//         "model": "",
//         "year": 0000,
//         "color": "",
//         "price": "",
//         "mileage": "",
//         "bodyType": "",
//         "fuelType": "",
//         "transmission": "",
//         "description": "",
//         "confidence": 0.0
//       }

//       For confidence, provide a value between 0 and 1 representing how confident you are in your overall identification.
//       Only respond with the JSON object, nothing else.
//     `;

//     // Get response from Gemini
//     const result = await model.generateContent([imagePart, prompt]);
//     const response = await result.response;
//     const text = response.text();
//     const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

//     // Parse the JSON response
//     try {
//       const carDetails = JSON.parse(cleanedText);

//       // Validate the response format
//       const requiredFields = [
//         "make",
//         "model",
//         "year",
//         "color",
//         "bodyType",
//         "price",
//         "mileage",
//         "fuelType",
//         "transmission",
//         "description",
//         "confidence",
//       ];

//       const missingFields = requiredFields.filter(
//         (field) => !(field in carDetails)
//       );

//       if (missingFields.length > 0) {
//         throw new Error(
//           `AI response missing required fields: ${missingFields.join(", ")}`
//         );
//       }

//       // Return success response with data
//       return {
//         success: true,
//         data: carDetails,
//       };
//     } catch (parseError) {
//       console.error("Failed to parse AI response:", parseError);
//       console.log("Raw response:", text);
//       return {
//         success: false,
//         error: "Failed to parse AI response",
//       };
//     }
//   } catch (error) {
//     console.error();
//     throw new Error("Gemini API error:" + error.message);
//   }
// }


export async function processCarImageWithAI(file) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelName = "gemini-2.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    let base64Image = await fileToBase64(file);
    let mimeType = file.type;

    const unsupportedFormats = ['image/avif', 'image/svg+xml', 'image/bmp', 'image/tiff'];
    
    if (unsupportedFormats.includes(file.type)) {
      console.log(`Converting ${file.type} to JPEG for Gemini compatibility`);
      const converted = await convertImageToJpeg(file);
      base64Image = converted.base64;
      mimeType = converted.mimeType;
    }

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const prompt = `
      Analyze this car image and extract the following information:
      1. Make (manufacturer)
      2. Model
      3. Year (approximately)
      4. Color
      5. Body type (SUV, Sedan, Hatchback, etc.)
      6. Mileage
      7. Fuel type (your best guess)
      8. Transmission type (your best guess)
      9. Price (your best guess)
      9. Short Description as to be added to a car listing

      Format your response as a clean JSON object with these fields:
      {
        "make": "",
        "model": "",
        "year": 0000,
        "color": "",
        "price": "",
        "mileage": "",
        "bodyType": "",
        "fuelType": "",
        "transmission": "",
        "description": "",
        "confidence": 0.0
      }

      For confidence, provide a value between 0 and 1 representing how confident you are in your overall identification.
      Only respond with the JSON object, nothing else.
    `;

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const maxAttempts = 3;
    let attempt = 0;
    let result;
    while (attempt < maxAttempts) {
      try {
        attempt += 1;
        result = await model.generateContent([imagePart, prompt]);
        break; 
      } catch (genErr) {
        const msg = String(genErr?.message || genErr);
        const isQuotaError =
          msg.includes("Quota exceeded") ||
          msg.includes("generate_content_free_tier") ||
          msg.includes("QuotaFailure") ||
          msg.includes("generate_content_free_tier_requests");

        const retryMatch = msg.match(/Please retry in\s*([0-9.]+)s/i);
        const retrySeconds = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : null;

        if (isQuotaError) {
          if (retrySeconds) {
            if (attempt >= maxAttempts) {
              return {
                success: false,
                error:
                  "Quota exceeded for the selected Gemini model. Please retry after " +
                  `${retrySeconds} seconds or upgrade your quota.`,
                retryAfter: retrySeconds,
              };
            }
            await sleep(retrySeconds * 1000);
            continue;
          }

          if (attempt < maxAttempts) {
            const backoffMs = Math.min(30000, 1000 * 2 ** attempt);
            await sleep(backoffMs);
            continue;
          }

          return {
            success: false,
            error:
              "Quota exceeded for the selected Gemini model (free tier). " +
              "Please upgrade your Google Cloud quota or use a different model. See: https://ai.google.dev/gemini-api/docs/rate-limits",
          };
        }

        throw genErr;
      }
    }

    if (!result) {
      return {
        success: false,
        error: "Failed to get response from Gemini after retries",
      };
    }

    const response = await result.response;
    const text = await response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    // Parse the JSON response
    try {
      const carDetails = JSON.parse(cleanedText);

      const requiredFields = [
        "make",
        "model",
        "year",
        "color",
        "bodyType",
        "price",
        "mileage",
        "fuelType",
        "transmission",
        "description",
        "confidence",
      ];

      const missingFields = requiredFields.filter((field) => !(field in carDetails));

      if (missingFields.length > 0) {
        throw new Error(`AI response missing required fields: ${missingFields.join(", ")}`);
      }

      return {
        success: true,
        data: carDetails,
      };
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw response:", text);
      return {
        success: false,
        error: "Failed to parse AI response",
        raw: text,
      };
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    const errMsg = String(error?.message || error);
    if (errMsg.includes("Quota exceeded") || errMsg.includes("generate_content_free_tier")) {
      return {
        success: false,
        error:
          "Quota exceeded for the Gemini image model. Upgrade your quota or choose another model. See: https://ai.google.dev/gemini-api/docs/rate-limits",
      };
    }
    throw new Error("Gemini API error:" + errMsg);
  }
}

async function convertImageToJpeg(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Convert to JPEG with 90% quality
    const jpegBuffer = await sharp(inputBuffer).jpeg({ quality: 90 }).toBuffer();
    const base64 = jpegBuffer.toString('base64');

    return {
      base64,
      mimeType: 'image/jpeg',
    };
  } catch (err) {
    throw new Error('Server-side image conversion failed: ' + (err?.message || String(err)));
  }
}

// Add a car to the database with images
export async function addCar({ carData, images }) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Create a unique folder name for this car's images
    const carId = uuidv4();
    const folderPath = `cars/${carId}`;

    // Initialize Supabase client for server-side operations
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Upload all images to Supabase storage
    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const base64Data = images[i];

      // Skip if image data is not valid
      if (!base64Data || !base64Data.startsWith("data:image/")) {
        console.warn("Skipping invalid image data");
        continue;
      }

      // Extract the base64 part (remove the data:image/xyz;base64, prefix)
      const base64 = base64Data.split(",")[1];
      const imageBuffer = Buffer.from(base64, "base64");

      // Determine file extension from the data URL
      const mimeMatch = base64Data.match(/data:image\/([a-zA-Z0-9]+);/);
      const fileExtension = mimeMatch ? mimeMatch[1] : "jpeg";

      // Create filename
      const fileName = `image-${Date.now()}-${i}.${fileExtension}`;
      const filePath = `${folderPath}/${fileName}`;

      // Upload the file buffer directly
      const { data, error } = await supabase.storage
        .from("car-images")
        .upload(filePath, imageBuffer, {
          contentType: `image/${fileExtension}`,
        });

      if (error) {
        console.error("Error uploading image:", error);
        throw new Error(`Failed to upload image: ${error.message}`);
      }

      // Get the public URL for the uploaded file
      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/car-images/${filePath}`; // disable cache in config

      imageUrls.push(publicUrl);
    }

    if (imageUrls.length === 0) {
      throw new Error("No valid images were uploaded");
    }

    // Add the car to the database
    const car = await db.car.create({
      data: {
        id: carId, // Use the same ID we used for the folder
        make: carData.make,
        model: carData.model,
        year: carData.year,
        // price: carData.price,
        price: new Prisma.Decimal(carData.price),
        mileage: carData.mileage,
        color: carData.color,
        fuelType: carData.fuelType,
        transmission: carData.transmission,
        bodyType: carData.bodyType,
        seats: carData.seats,
        description: carData.description,
        status: carData.status,
        featured: carData.featured,
        images: imageUrls, // Store the array of image URLs
      },
    });

    // Revalidate the cars list page
    revalidatePath("/admin/cars");

    return {
      success: true,
    };
  } catch (error) {
    throw new Error("Error adding car:" + error.message);
  }
}

// Fetch all cars with simple search
export async function getCars(search = "") {
  try {
    // Build where conditions
    let where = {};

    // Add search filter
    if (search) {
      where.OR = [
        { make: { contains: search, mode: "insensitive" } },
        { model: { contains: search, mode: "insensitive" } },
        { color: { contains: search, mode: "insensitive" } },
      ];
    }

    // Execute main query
    const cars = await db.car.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const serializedCars = cars.map(serializeCarData);

    return {
      success: true,
      data: serializedCars,
    };
  } catch (error) {
    console.error("Error fetching cars:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Delete a car by ID
export async function deleteCar(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // First, fetch the car to get its images
    const car = await db.car.findUnique({
      where: { id },
      select: { images: true },
    });

    if (!car) {
      return {
        success: false,
        error: "Car not found",
      };
    }

    // Delete the car from the database
    await db.car.delete({
      where: { id },
    });

    // Delete the images from Supabase storage
    try {
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);

      // Extract file paths from image URLs
      const filePaths = car.images
        .map((imageUrl) => {
          const url = new URL(imageUrl);
          const pathMatch = url.pathname.match(/\/car-images\/(.*)/);
          return pathMatch ? pathMatch[1] : null;
        })
        .filter(Boolean);

      // Delete files from storage if paths were extracted
      if (filePaths.length > 0) {
        const { error } = await supabase.storage
          .from("car-images")
          .remove(filePaths);

        if (error) {
          console.error("Error deleting images:", error);
          // We continue even if image deletion fails
        }
      }
    } catch (storageError) {
      console.error("Error with storage operations:", storageError);
      // Continue with the function even if storage operations fail
    }

    // Revalidate the cars list page
    revalidatePath("/admin/cars");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting car:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Update car status or featured status
export async function updateCarStatus(id, { status, featured }) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const updateData = {};

    if (status !== undefined) {
      updateData.status = status;
    }

    if (featured !== undefined) {
      updateData.featured = featured;
    }

    // Update the car
    await db.car.update({
      where: { id },
      data: updateData,
    });

    // Revalidate the cars list page
    revalidatePath("/admin/cars");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating car status:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
