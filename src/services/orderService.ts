import { api, handleApiError } from './api';
import { Order, OrderCreate } from '../types';

export interface OrderResponse {
  order: Order;
  message?: string;
}

export interface OrderListResponse {
  orders: Order[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface TrackingResponse {
  order: Order;
  trackingHistory: Array<{
    status: string;
    timestamp: string;
    description: string;
    location?: string;
  }>;
}

export const orderService = {
  // Tạo đơn hàng mới
  createOrder: async (orderData: OrderCreate): Promise<Order> => {
    try {
      const response = await api.post<OrderResponse>('/orders', orderData);
      return response.order;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // Lấy thông tin đơn hàng theo ID
  getOrderById: async (orderId: string): Promise<Order> => {
    try {
      const response = await api.get<OrderResponse>(`/orders/${orderId}`);
      return response.order;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // Lấy danh sách đơn hàng của user
  getUserOrders: async (userId: string, page: number = 1, limit: number = 10): Promise<OrderListResponse> => {
    try {
      const response = await api.get<OrderListResponse>(`/users/${userId}/orders`, {
        params: { page, limit }
      });
      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: async (orderId: string, status: string): Promise<Order> => {
    try {
      const response = await api.patch<OrderResponse>(`/orders/${orderId}/status`, { status });
      return response.order;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // Hủy đơn hàng
  cancelOrder: async (orderId: string, reason?: string): Promise<Order> => {
    try {
      const response = await api.patch<OrderResponse>(`/orders/${orderId}/cancel`, { reason });
      return response.order;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // Tracking đơn hàng
  trackOrder: async (orderId: string): Promise<TrackingResponse> => {
    try {
      const response = await api.get<TrackingResponse>(`/orders/${orderId}/tracking`);
      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  }
}; 