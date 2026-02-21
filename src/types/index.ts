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

export interface Cart {
  cartId: string | null;
  items: CartItem[];
  isOpen: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
}

export interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  cardType: string;
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}
