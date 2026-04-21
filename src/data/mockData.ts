import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Silk Evening Gown',
    description: 'A luxurious silk gown for elegant evenings. Features a flattering silhouette and premium finish.',
    price: 299.99,
    originalPrice: 450.00,
    category: 'Women',
    tags: ['Elegance', 'Silk', 'Evening'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewsCount: 124,
    isTrending: true,
    isBestSeller: true,
    variants: [
      {
        id: 'v1-1',
        color: '#0f3d2e',
        colorName: 'Emerald Green',
        images: [
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1549575810-b9b775438332?auto=format&fit=crop&q=80&w=800'
        ]
      },
      {
        id: 'v1-2',
        color: '#000000',
        colorName: 'Midnight Black',
        images: [
          'https://images.unsplash.com/photo-1539109132314-3477524c859d?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800'
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'p2',
    name: 'Classic Linen Shirt',
    description: 'Breathable linen shirt perfect for summer days. Minimalist design with a premium feel.',
    price: 89.99,
    category: 'Men',
    tags: ['Linen', 'Summer', 'Casual'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviewsCount: 89,
    isNew: true,
    isTrending: true,
    variants: [
      {
        id: 'v2-1',
        color: '#ffffff',
        colorName: 'Cloud White',
        images: [
          'https://images.unsplash.com/photo-1594932224010-70f90e541494?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1620012253295-c052802d23b7?auto=format&fit=crop&q=80&w=800'
        ]
      },
      {
        id: 'v2-2',
        color: '#8A9A5B',
        colorName: 'Sage Green',
        images: [
          'https://images.unsplash.com/photo-1616110300409-77bc94474776?auto=format&fit=crop&q=80&w=800'
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'p3',
    name: 'Minimalist Chelsea Boots',
    description: 'High-quality leather boots with a sleek profile. Durable and stylish for all occasions.',
    price: 159.00,
    category: 'Footwear',
    tags: ['Leather', 'Boots', 'Footwear'],
    sizes: ['40', '41', '42', '43', '44'],
    rating: 4.9,
    reviewsCount: 210,
    isBestSeller: true,
    isTrending: true,
    variants: [
      {
        id: 'v3-1',
        color: '#4b3621',
        colorName: 'Deep Brown',
        images: [
          'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800'
        ]
      },
      {
        id: 'v3-2',
        color: '#000000',
        colorName: 'Matte Black',
        images: [
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800'
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'p4',
    name: 'Canvas Tote Bag',
    description: 'A versatile canvas tote for your daily essentials. Minimal branding, maximum utility.',
    price: 45.00,
    category: 'Accessories',
    tags: ['Canvas', 'Bag', 'Accessories'],
    sizes: ['One Size'],
    rating: 4.2,
    reviewsCount: 45,
    isBestSeller: true,
    variants: [
      {
        id: 'v4-1',
        color: '#f5f5dc',
        colorName: 'Beige',
        images: [
          'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'p5',
    name: 'Oversized Wool Coat',
    description: 'A statement wool coat designed for colder seasons. Features a relaxed fit and premium warmth.',
    price: 349.00,
    category: 'Women',
    tags: ['Outerwear', 'Wool', 'Winter'],
    sizes: ['S', 'M', 'L'],
    rating: 4.7,
    reviewsCount: 56,
    isNew: true,
    variants: [
      {
        id: 'v5-1',
        color: '#a52a2a',
        colorName: 'Camel',
        images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800']
      }
    ],
    reviews: []
  },
  {
    id: 'p6',
    name: 'Slim Fit Chinos',
    description: 'Versatile chinos that transition perfectly from office to evening. Stretch cotton for comfort.',
    price: 79.00,
    category: 'Men',
    tags: ['Pants', 'Chinos', 'Smart Casual'],
    sizes: ['30', '32', '34', '36'],
    rating: 4.4,
    reviewsCount: 112,
    isTrending: true,
    variants: [
      {
        id: 'v6-1',
        color: '#2c3e50',
        colorName: 'Navy',
        images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800']
      }
    ],
    reviews: []
  },
  {
    id: 'p7',
    name: 'Leather Sneakers',
    description: 'Handcrafted leather sneakers with a minimalist profile. Comfort meets high fashion.',
    price: 129.00,
    category: 'Footwear',
    tags: ['Leather', 'Sneakers', 'Footwear'],
    sizes: ['40', '41', '42', '43', '44'],
    rating: 4.6,
    reviewsCount: 78,
    isBestSeller: true,
    variants: [
      {
        id: 'v7-1',
        color: '#ffffff',
        colorName: 'Optic White',
        images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800']
      }
    ],
    reviews: []
  },
  {
    id: 'p8',
    name: 'Cashmere Beanie',
    description: 'Ultra-soft cashmere beanie for ultimate winter comfort. One size fits all.',
    price: 65.00,
    category: 'Accessories',
    tags: ['Cashmere', 'Winter', 'Accessories'],
    sizes: ['One Size'],
    rating: 4.9,
    reviewsCount: 34,
    isNew: true,
    variants: [
      {
        id: 'v8-1',
        color: '#808080',
        colorName: 'Heather Grey',
        images: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800']
      }
    ],
    reviews: []
  }
];

export const CATEGORIES = [
  { id: 'men', name: 'Men', image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800' },
  { id: 'women', name: 'Women', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800' },
  { id: 'kids', name: 'Kids', image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=800' },
  { id: 'footwear', name: 'Footwear', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800' },
  { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800' }
];

export const HERO_SLIDES = [
  {
    title: 'Autumn Collection 2024',
    subtitle: 'Rediscover Elegance',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920',
    cta: 'Shop Collection'
  },
  {
    title: 'Modern Minimalist',
    subtitle: 'Simplicity redefined for the modern age.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1920',
    cta: 'View Trends'
  }
];
