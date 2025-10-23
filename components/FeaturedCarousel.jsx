// 'use client';
// import useEmblaCarousel from 'embla-carousel-react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useCallback } from 'react';

// export default function FeaturedCarousel({ items }) {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

//   const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
//   const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

//   return (
//     <div className="relative w-full mt-12">
//       <div className="overflow-hidden" ref={emblaRef}>
//         <div className="flex gap-6">
//           {items.map((item, idx) => (
//             <motion.div
//               key={idx}
//               className="min-w-[300px] sm:min-w-[400px] lg:min-w-[500px] bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300"
//               whileHover={{ scale: 1.05 }}
//             >
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 width={500}
//                 height={300}
//                 className="rounded-xl object-cover w-full h-56"
//               />
//               <div className="mt-4">
//                 <h3 className="text-xl font-semibold text-white">{item.title}</h3>
//                 <p className="text-gray-200 text-sm">{item.description}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation Buttons */}
//       <button
//         onClick={scrollPrev}
//         className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-black p-2 rounded-full"
//       >
//         ‹
//       </button>
//       <button
//         onClick={scrollNext}
//         className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-black p-2 rounded-full"
//       >
//         ›
//       </button>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function FeaturedCarousel({ items }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % items.length);
  const prev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (!items?.length) {
    return (
      <p className="text-center text-gray-400 py-20">
        No featured items available.
      </p>
    );
  }

  return (
    <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            <Image
              src={items[current].image}
              alt={items[current].title}
              fill
              className="object-cover brightness-75"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {items[current].title}
              </motion.h2>
              <motion.p
                className="max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-md"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {items[current].description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 p-3 rounded-full text-white"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 p-3 rounded-full text-white"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {items.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === current ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}


