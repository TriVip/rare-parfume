import { api, handleApiError } from './api';

export interface PaymentIntentData {
  orderId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  returnUrl?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  qrCodeUrl?: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    transferContent: string;
  };
  message?: string;
}

export interface PaymentStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  transactionId: string;
  amount: number;
  currency: string;
  paidAt?: string;
  failureReason?: string;
}

export interface PaymentHistoryItem {
  id: string;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
  completedAt?: string;
}

export interface PaymentHistoryResponse {
  payments: PaymentHistoryItem[];
}

export const paymentService = {
  // Tạo payment intent
  createPaymentIntent: async (data: PaymentIntentData): Promise<PaymentResult> => {
    try {
      const response = await api.post<PaymentResult>('/payments/create-intent', data);
      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // Xác nhận thanh toán
  confirmPayment: async (transactionId: string, paymentData?: any): Promise<PaymentResult> => {
    try {
      const response = await api.post<PaymentResult>(`/payments/${transactionId}/confirm`, paymentData);
      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // Kiểm tra trạng thái thanh toán
  getPaymentStatus: async (transactionId: string): Promise<PaymentStatus> => {
    try {
      const response = await api.get<PaymentStatus>(`/payments/${transactionId}/status`);
      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // Tạo QR code thanh toán
  generateQRCode: async (amount: number, content: string, orderId: string): Promise<{ qrCodeUrl: string }> => {
    try {
      const response = await api.post<{ qrCodeUrl: string }>('/payments/generate-qr', {
        amount,
        content,
        orderId
      });
      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // Hủy thanh toán
  cancelPayment: async (transactionId: string, reason?: string): Promise<PaymentResult> => {
    try {
      const response = await api.post<PaymentResult>(`/payments/${transactionId}/cancel`, { reason });
      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  // Lấy lịch sử thanh toán
  getPaymentHistory: async (orderId: string): Promise<PaymentHistoryItem[]> => {
    try {
      const response = await api.get<PaymentHistoryResponse>(`/payments/history/order/${orderId}`);
      return response.payments;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  }
}; 