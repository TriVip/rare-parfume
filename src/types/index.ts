export interface VolumeOption {
  size: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockQuantity: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  ingredients: string[];
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  volume: string;
  volumes?: VolumeOption[];
  origin: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  trackingNumber?: string;
}

export interface FilterOptions {
  brands: string[];
  genders: string[];
  priceRange: [number, number];
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

// Payment related types
export interface PaymentMethod {
  id: string;
  type: 'qr' | 'bank_transfer' | 'cash';
  name: string;
  description: string;
  icon: string;
  isEnabled: boolean;
}

export interface PaymentInfo {
  method: PaymentMethod;
  qrCodeUrl?: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  transactionId?: string;
  amount: number;
  currency: string;
}

export interface CheckoutState {
  step: 'info' | 'payment' | 'confirmation';
  customerInfo: CustomerInfo;
  shippingMethod: ShippingMethod;
  paymentInfo?: PaymentInfo;
  isProcessing: boolean;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  isSelected: boolean;
}

// Enhanced Order interface
export interface OrderCreate {
  customerInfo: CustomerInfo;
  items: CartItem[];
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  notes?: string;
}

export interface OrderStatus {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  message: string;
  timestamp: string;
} 