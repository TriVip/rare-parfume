import { api, handleApiError } from './api';
import { Product } from '../types';

export interface Category {
  id: number;
  name: string;
  slug: string;
  // Add other fields as needed
}

// Endpoints phổ biến cho các CMS
const ENDPOINTS = {
  // Strapi v4
  STRAPI_PRODUCTS: '/api/products',
  STRAPI_CATEGORIES: '/api/categories',
  
  // Strapi v3 hoặc cũ hơn
  LEGACY_PRODUCTS: '/products',
  LEGACY_CATEGORIES: '/categories',
  
  // WordPress với WooCommerce
  WP_PRODUCTS: '/wp-json/wc/v3/products',
  WP_CATEGORIES: '/wp-json/wc/v3/products/categories'
};

// CMS Service for interacting with the backend
const cmsService = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    try {
      // Thử các endpoint phổ biến
      let response;
      let error;
      
      try {
        // Thử endpoint Strapi v4 trước
        response = await api.get<any>(ENDPOINTS.STRAPI_PRODUCTS);
        console.log('Successful with Strapi v4 endpoint');
      } catch (e) {
        error = e;
        try {
          // Thử endpoint cũ hơn
          response = await api.get<any>(ENDPOINTS.LEGACY_PRODUCTS);
          console.log('Successful with legacy endpoint');
          error = null;
        } catch (e2) {
          console.log('Both endpoints failed, using original error');
        }
      }
      
      if (error) {
        throw error;
      }
      
      console.log('Raw API response:', response);
      
      // Kiểm tra cấu trúc dữ liệu
      if (!response) {
        console.error('API response is empty');
        return [];
      }
      
      // Xử lý các trường hợp cấu trúc dữ liệu khác nhau
      let productsData;
      
      if (Array.isArray(response)) {
        // Trường hợp API trả về mảng trực tiếp
        productsData = response;
      } else if (response.data && Array.isArray(response.data)) {
        // Trường hợp API trả về { data: [...] } (Strapi v4)
        productsData = response.data;
      } else if (response.products && Array.isArray(response.products)) {
        // Trường hợp API trả về { products: [...] }
        productsData = response.products;
      } else if (response.attributes && Array.isArray(response.attributes)) {
        // Một số CMS khác
        productsData = response.attributes;
      } else {
        console.error('Unexpected API response structure:', response);
        return [];
      }
      
      // Chuyển đổi dữ liệu để phù hợp với kiểu Product
      return productsData.map((item: any) => {
        // Xử lý cấu trúc Strapi v4 (có attributes nested)
        const data = item.attributes ? { id: item.id, ...item.attributes } : item;
        
        return {
          id: data.id || '',
          name: data.name || data.title || '',
          description: data.description || '',
          price: data.price || 0,
          images: data.images || [data.image || ''],
          brand: data.brand || '',
          category: data.category || '',
          inStock: data.inStock !== undefined ? data.inStock : true,
          // Thêm các trường khác nếu cần
          rating: data.rating || 0,
          reviewCount: data.reviewCount || 0,
          originalPrice: data.originalPrice,
          isNew: data.isNew,
          isFeatured: data.isFeatured,
          volume: data.volume || '',
          origin: data.origin || '',
          ingredients: data.ingredients || [],
          notes: data.notes || { top: [], middle: [], base: [] }
        };
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error(handleApiError(error));
    }
  },

  getProductById: async (id: string): Promise<Product> => {
    try {
      // Thử các endpoint phổ biến
      let response;
      let error;
      
      try {
        // Thử endpoint Strapi v4 trước
        response = await api.get<any>(`${ENDPOINTS.STRAPI_PRODUCTS}/${id}`);
      } catch (e) {
        error = e;
        try {
          // Thử endpoint cũ hơn
          response = await api.get<any>(`${ENDPOINTS.LEGACY_PRODUCTS}/${id}`);
          error = null;
        } catch (e2) {
          console.log('Both product detail endpoints failed');
        }
      }
      
      if (error) {
        throw error;
      }
      
      // Xử lý dữ liệu trả về
      let productData;
      
      if (response.data && response.data.attributes) {
        // Strapi v4 format
        productData = { id: response.data.id, ...response.data.attributes };
      } else if (response.data) {
        // Một số API trả về { data: {...} }
        productData = response.data;
      } else {
        // Trường hợp API trả về object trực tiếp
        productData = response;
      }
      
      return {
        id: productData.id || id,
        name: productData.name || productData.title || '',
        description: productData.description || '',
        price: productData.price || 0,
        images: productData.images || [productData.image || ''],
        brand: productData.brand || '',
        category: productData.category || '',
        inStock: productData.inStock !== undefined ? productData.inStock : true,
        rating: productData.rating || 0,
        reviewCount: productData.reviewCount || 0,
        originalPrice: productData.originalPrice,
        isNew: productData.isNew,
        isFeatured: productData.isFeatured,
        volume: productData.volume || '',
        origin: productData.origin || '',
        ingredients: productData.ingredients || [],
        notes: productData.notes || { top: [], middle: [], base: [] }
      };
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      throw new Error(handleApiError(error));
    }
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    try {
      // Thử các endpoint phổ biến
      let response;
      let error;
      
      try {
        // Thử endpoint Strapi v4 trước
        response = await api.get<any>(ENDPOINTS.STRAPI_CATEGORIES);
      } catch (e) {
        error = e;
        try {
          // Thử endpoint cũ hơn
          response = await api.get<any>(ENDPOINTS.LEGACY_CATEGORIES);
          error = null;
        } catch (e2) {
          console.log('Both category endpoints failed');
        }
      }
      
      if (error) {
        throw error;
      }
      
      // Xử lý các trường hợp cấu trúc dữ liệu khác nhau
      let categoriesData;
      
      if (Array.isArray(response)) {
        categoriesData = response;
      } else if (response.data && Array.isArray(response.data)) {
        categoriesData = response.data;
      } else if (response.categories && Array.isArray(response.categories)) {
        categoriesData = response.categories;
      } else {
        console.error('Unexpected API response structure:', response);
        return [];
      }
      
      return categoriesData.map((item: any) => {
        // Xử lý cấu trúc Strapi v4 (có attributes nested)
        const data = item.attributes ? { id: item.id, ...item.attributes } : item;
        
        return {
          id: data.id || 0,
          name: data.name || '',
          slug: data.slug || ''
        };
      });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw new Error(handleApiError(error));
    }
  },

  getCategoryById: async (id: number): Promise<Category> => {
    try {
      // Thử các endpoint phổ biến
      let response;
      let error;
      
      try {
        // Thử endpoint Strapi v4 trước
        response = await api.get<any>(`${ENDPOINTS.STRAPI_CATEGORIES}/${id}`);
      } catch (e) {
        error = e;
        try {
          // Thử endpoint cũ hơn
          response = await api.get<any>(`${ENDPOINTS.LEGACY_CATEGORIES}/${id}`);
          error = null;
        } catch (e2) {
          console.log('Both category detail endpoints failed');
        }
      }
      
      if (error) {
        throw error;
      }
      
      // Xử lý dữ liệu trả về
      let categoryData;
      
      if (response.data && response.data.attributes) {
        // Strapi v4 format
        categoryData = { id: response.data.id, ...response.data.attributes };
      } else if (response.data) {
        categoryData = response.data;
      } else {
        categoryData = response;
      }
      
      return {
        id: categoryData.id || id,
        name: categoryData.name || '',
        slug: categoryData.slug || ''
      };
    } catch (error) {
      console.error(`Failed to fetch category ${id}:`, error);
      throw new Error(handleApiError(error));
    }
  },

  // Add more methods as needed for your CMS functionality
};

export default cmsService; 