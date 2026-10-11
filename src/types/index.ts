export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
  newsletter?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  description: string;
  shortDescription: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  category: string;
  brand: string;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem extends Omit<Product, 'stockQuantity'> {
  quantity: number;
  stockQuantity?: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  totalItems: number;
  coupon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  product: {
    id: string;
    name: string;
    image: string;
  };
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  couponCode?: string;
  couponDiscount?: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: string;
    installments?: number;
    cardLastFour?: string;
  };
  trackingCode?: string;
  trackingUrl?: string;
}
