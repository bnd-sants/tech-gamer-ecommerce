import axios from 'axios';
import type { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  Product,
  Cart,
  Order,
} from '@/types';

// Configuração base do axios
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@techgamer:token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Se o erro for 401 (não autorizado) e não for uma tentativa de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('@techgamer:refreshToken');
        if (refreshToken) {
          const response = await axios.post<AuthResponse>(
            `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/auth/refresh-token`,
            { refreshToken }
          );
          
          const { token, refreshToken: newRefreshToken } = response.data;
          
          localStorage.setItem('@techgamer:token', token);
          localStorage.setItem('@techgamer:refreshToken', newRefreshToken);
          
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Falha ao renovar token:', refreshError);
        localStorage.removeItem('@techgamer:token');
        localStorage.removeItem('@techgamer:refreshToken');
        localStorage.removeItem('@techgamer:user');
        window.location.href = '/auth/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Serviços de autenticação
const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },
  
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
  
  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },
  
  resetPassword: async (token: string, password: string): Promise<void> => {
    await api.post('/auth/reset-password', { token, password });
  },
  
  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
  
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put<User>('/auth/me', data);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('@techgamer:token');
      localStorage.removeItem('@techgamer:refreshToken');
      localStorage.removeItem('@techgamer:user');
    }
  },
};

// Serviços de produtos
const productService = {
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
  }): Promise<{ products: Product[]; total: number }> => {
    const response = await api.get<{ products: Product[]; total: number }>('/products', { params });
    return response.data;
  },
  
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
  
  getProductBySlug: async (slug: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/slug/${slug}`);
    return response.data;
  },
  
  getFeaturedProducts: async (limit: number = 8): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products/featured', { params: { limit } });
    return response.data;
  },
  
  getRelatedProducts: async (productId: string, limit: number = 4): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/${productId}/related`, { params: { limit } });
    return response.data;
  },
  
  searchProducts: async (query: string, params?: {
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<{ products: Product[]; total: number }> => {
    const response = await api.get<{ products: Product[]; total: number }>('/products/search', {
      params: { q: query, ...params },
    });
    return response.data;
  },
};

// Serviços de carrinho
const cartService = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get<Cart>('/cart');
    return response.data;
  },
  
  addToCart: async (productId: string, quantity: number = 1): Promise<Cart> => {
    const response = await api.post<Cart>('/cart/items', { productId, quantity });
    return response.data;
  },
  
  updateCartItem: async (itemId: string, quantity: number): Promise<Cart> => {
    const response = await api.put<Cart>(`/cart/items/${itemId}`, { quantity });
    return response.data;
  },
  
  removeFromCart: async (itemId: string): Promise<Cart> => {
    const response = await api.delete<Cart>(`/cart/items/${itemId}`);
    return response.data;
  },
  
  clearCart: async (): Promise<void> => {
    await api.delete('/cart');
  },
  
  applyCoupon: async (code: string): Promise<Cart> => {
    const response = await api.post<Cart>('/cart/coupon', { code });
    return response.data;
  },
  
  removeCoupon: async (): Promise<Cart> => {
    const response = await api.delete<Cart>('/cart/coupon');
    return response.data;
  },
  
  getShippingOptions: async (zipCode: string): Promise<{
    options: Array<{
      id: string;
      name: string;
      price: number;
      estimatedDays: string;
    }>;
  }> => {
    const response = await api.get(`/shipping/${zipCode}`);
    return response.data;
  },
};

// Serviços de pedidos
const orderService = {
  createOrder: async (data: {
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>;
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
      type: 'credit_card' | 'pix' | 'bank_slip';
      installments?: number;
      card?: {
        number: string;
        holderName: string;
        expirationDate: string;
        cvv: string;
        token?: string;
      };
    };
    couponCode?: string;
  }): Promise<{ id: string; paymentUrl?: string }> => {
    const response = await api.post<{ id: string; paymentUrl?: string }>('/orders', data);
    return response.data;
  },
  
  getOrders: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{
    orders: Array<{
      id: string;
      status: string;
      total: number;
      createdAt: string;
      items: Array<{
        id: string;
        product: {
          id: string;
          name: string;
          image: string;
        };
        quantity: number;
        price: number;
      }>;
    }>;
    total: number;
  }> => {
    const response = await api.get('/orders', { params });
    return response.data;
  },
  
  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },
};

// Exporta todos os serviços
const services = {
  auth: authService,
  products: productService,
  cart: cartService,
  orders: orderService,
};

export default services;
export { api };
