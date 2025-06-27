import React from 'react';
import { Package, Truck } from 'lucide-react';
import { CartItem, ShippingMethod } from '../types';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingMethod: ShippingMethod;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  shippingMethod
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Package className="w-5 h-5 mr-2" />
        Tóm tắt đơn hàng
      </h3>

      {/* Items List */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={item.product.images[0]} 
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.product.name}
              </h4>
              <p className="text-sm text-gray-500">
                {item.product.brand} - {item.product.volume}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-600">
                  Số lượng: {item.quantity}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Method */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex items-center mb-2">
          <Truck className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">Phương thức giao hàng</span>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-900">{shippingMethod.name}</p>
              <p className="text-xs text-gray-600">{shippingMethod.description}</p>
              <p className="text-xs text-blue-600 mt-1">
                Dự kiến: {shippingMethod.estimatedDays}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {formatPrice(shippingMethod.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tạm tính</span>
          <span className="text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className="text-gray-900">{formatPrice(shipping)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">VAT (10%)</span>
          <span className="text-gray-900">{formatPrice(tax)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-900">Tổng cộng</span>
            <span className="text-lg font-bold text-blue-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="mt-6 p-3 bg-green-50 rounded-lg">
        <p className="text-xs text-green-700 text-center">
          🔒 Thanh toán an toàn và bảo mật
        </p>
      </div>
    </div>
  );
};

export default OrderSummary; 