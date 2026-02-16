export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  sizes?: string[];
  colors?: string[];
  brand?: string;
  material?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}