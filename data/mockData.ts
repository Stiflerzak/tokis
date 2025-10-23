export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFlashSale?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  thumbnail: string;
  subcategories?: string[];
}

export const categories: Category[] = [
  {
    id: 'daily-deals',
    name: 'Daily Deals',
    icon: '🎯',
    thumbnail: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=200&h=200&fit=crop'
  },
  {
    id: 'gym-equipment',
    name: 'Gym Equipment',
    icon: '💪',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
    subcategories: ['Cardio', 'Strength', 'Recovery']
  },
  {
    id: 'hot-deals',
    name: 'Hot Deals',
    icon: '🔥',
    thumbnail: 'https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=200&h=200&fit=crop'
  },
  {
    id: 'new',
    name: 'New',
    icon: '🆕',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop'
  },
  {
    id: 'flash-sales',
    name: 'Flash Sales',
    icon: '⚡',
    thumbnail: 'https://images.unsplash.com/photo-1607083206896-59080d20ba0b?w=200&h=200&fit=crop'
  },
  {
    id: 'perfume',
    name: 'Perfume',
    icon: '💎',
    thumbnail: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?w=200&h=200&fit=crop'
  },
  {
    id: 'hiking',
    name: 'Hiking',
    icon: '🥾',
    thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop',
    subcategories: ['Kids', 'Women', 'Men']
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Treadmill Pro X1',
    price: 1299.99,
    originalPrice: 1599.99,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop'
    ],
    category: 'gym-equipment',
    description: 'Professional-grade treadmill with advanced features for home fitness enthusiasts.',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    isBestSeller: true,
    isFlashSale: true
  },
  {
    id: '2',
    name: 'Luxury Cologne Collection',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=600&fit=crop'
    ],
    category: 'perfume',
    description: 'Exquisite cologne collection featuring premium fragrances for the modern gentleman.',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    isNew: true
  },
  {
    id: '3',
    name: 'Professional Hiking Boots',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop'
    ],
    category: 'hiking',
    description: 'Durable, waterproof hiking boots designed for challenging terrains and long adventures.',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    isBestSeller: true
  },
  {
    id: '4',
    name: 'Smart Fitness Dumbbells',
    price: 349.99,
    originalPrice: 429.99,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop'
    ],
    category: 'gym-equipment',
    description: 'Adjustable smart dumbbells with weight tracking and workout guidance.',
    rating: 4.7,
    reviews: 112,
    inStock: true,
    isFlashSale: true
  },
  {
    id: '5',
    name: 'Elite Women\'s Perfume',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop'
    ],
    category: 'perfume',
    description: 'Sophisticated feminine fragrance with floral and woody notes.',
    rating: 4.5,
    reviews: 67,
    inStock: true,
    isNew: true
  },
  {
    id: '6',
    name: 'Kids Adventure Backpack',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop'
    ],
    category: 'hiking',
    description: 'Lightweight, durable backpack perfect for young adventurers.',
    rating: 4.8,
    reviews: 145,
    inStock: true,
    isBestSeller: true
  }
];

export const brands = [
  {
    id: '1',
    name: 'FitnessPro',
    logo: 'https://via.placeholder.com/150x80/000000/FFD700?text=FitnessPro'
  },
  {
    id: '2',
    name: 'LuxeScent',
    logo: 'https://via.placeholder.com/150x80/000000/FFD700?text=LuxeScent'
  },
  {
    id: '3',
    name: 'TrailMaster',
    logo: 'https://via.placeholder.com/150x80/000000/FFD700?text=TrailMaster'
  },
  {
    id: '4',
    name: 'PowerGear',
    logo: 'https://via.placeholder.com/150x80/000000/FFD700?text=PowerGear'
  },
  {
    id: '5',
    name: 'PerfumeHouse',
    logo: 'https://via.placeholder.com/150x80/000000/FFD700?text=PerfumeHouse'
  },
  {
    id: '6',
    name: 'OutdoorElite',
    logo: 'https://via.placeholder.com/150x80/000000/FFD700?text=OutdoorElite'
  }
];

export const heroSlides = [
  {
    id: '1',
    title: 'Premium Gym Equipment',
    subtitle: 'Transform your fitness journey',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop',
    cta: 'Shop Now',
    category: 'gym-equipment'
  },
  {
    id: '2',
    title: 'Luxury Fragrances',
    subtitle: 'Discover your signature scent',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?w=1200&h=600&fit=crop',
    cta: 'Explore Collection',
    category: 'perfume'
  },
  {
    id: '3',
    title: 'Adventure Awaits',
    subtitle: 'Gear up for your next expedition',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=600&fit=crop',
    cta: 'Get Ready',
    category: 'hiking'
  }
];

export const offers = [
  'Free Delivery within Nairobi',
  'Shop & Earn Points on Every Purchase',
  'Warranty Assured on All Products',
  'Flash Sale - Up to 50% Off',
  '24/7 Customer Support Available'
];
