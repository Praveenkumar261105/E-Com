export interface ProductVariant {
  id: string;
  color: string;
  colorName: string;
  images: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Men' | 'Women' | 'Kids' | 'Footwear' | 'Accessories';
  tags: string[];
  variants: ProductVariant[];
  sizes: string[];
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  selectedVariantId: string;
  selectedSize: string;
  quantity: number;
}
