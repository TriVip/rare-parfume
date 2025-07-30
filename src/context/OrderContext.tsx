import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Order, OrderCreate, OrderStatus } from '../types';
import { post, patch } from '../utils/api';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

type OrderAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: { id: string; updates: Partial<Order> } }
  | { type: 'SET_CURRENT_ORDER'; payload: Order | null }
  | { type: 'SET_ORDERS'; payload: Order[] };

interface OrderContextType extends OrderState {
  createOrder: (orderData: OrderCreate) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        currentOrder: action.payload
      };
    
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, ...action.payload.updates }
            : order
        ),
        currentOrder: state.currentOrder?.id === action.payload.id
          ? { ...state.currentOrder, ...action.payload.updates }
          : state.currentOrder
      };
    
    case 'SET_CURRENT_ORDER':
      return { ...state, currentOrder: action.payload };
    
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    
    default:
      return state;
  }
};

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, {
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null
  });

  // API functions - these will connect to your backend later
  const createOrder = async (orderData: OrderCreate): Promise<Order> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const order = await post<Order>('/orders', orderData);
      dispatch({ type: 'ADD_ORDER', payload: order });
      return order;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const updated = await patch<Order>(`/orders/${orderId}/status`, { status: status.status });
      dispatch({
        type: 'UPDATE_ORDER',
        payload: {
          id: orderId,
          updates: { status: updated.status }
        }
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update order status';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return state.orders.find(order => order.id === orderId);
  };

  const getUserOrders = (userId: string): Order[] => {
    return state.orders.filter(order => order.userId === userId);
  };

  const value: OrderContextType = {
    ...state,
    createOrder,
    updateOrderStatus,
    getOrderById,
    getUserOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}; 