import { api, handleApiError } from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
}

export const productService = {
  /**
   * Get all products
   */
  getAllProducts: async (): Promise<Product[]> => {
    try {
      return await api.get<Product[]>('/products');
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Get a product by ID
   */
  getProductById: async (id: string): Promise<Product> => {
    try {
      return await api.get<Product>(`/products/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Get featured products
   */
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      return await api.get<Product[]>('/products/featured');
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Get products by category
   */
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      return await api.get<Product[]>(`/products/category/${category}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Search products
   */
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      return await api.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};
