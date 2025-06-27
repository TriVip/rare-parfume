import React from 'react';
import { CheckCircle, Package, Clock, ArrowLeft, Download } from 'lucide-react';
import { CheckoutState, CartItem } from '../types';

interface OrderConfirmationProps {
  checkoutState: CheckoutState;
  total: number;
  items: CartItem[];
  onComplete: () => void;
  onBack: () => void;
  isProcessing: boolean;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  checkoutState,
  total,
  items,
  onComplete,
  onBack,
  isProcessing
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const generateOrderId = () => {
    return `DH${Date.now().toString().slice(-6)}`;
  };

  const orderId = generateOrderId();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Xác nhận đơn hàng
        </h3>
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
          disabled={isProcessing}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Quay lại
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium text-green-900">
              Đơn hàng đã được tạo thành công!
            </h4>
            <p className="text-sm text-green-700">
              Mã đơn hàng: <span className="font-medium">#{orderId}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Thông tin khách hàng</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Họ tên:</p>
            <p className="font-medium">
              {checkoutState.customerInfo.firstName} {checkoutState.customerInfo.lastName}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-medium">{checkoutState.customerInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Số điện thoại:</p>
            <p className="font-medium">{checkoutState.customerInfo.phone}</p>
          </div>
          <div>
            <p className="text-gray-600">Địa chỉ giao hàng:</p>
            <p className="font-medium">
              {checkoutState.customerInfo.address}, {checkoutState.customerInfo.ward}, 
              {checkoutState.customerInfo.district}, {checkoutState.customerInfo.city}
            </p>
          </div>
        </div>
        
        {checkoutState.customerInfo.notes && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-gray-600">Ghi chú:</p>
            <p className="font-medium">{checkoutState.customerInfo.notes}</p>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Sản phẩm đã đặt</h4>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center space-x-3 py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-gray-900 truncate">
                  {item.product.name}
                </h5>
                <p className="text-xs text-gray-500">
                  {item.product.brand} - {item.product.volume}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {item.quantity} x {formatPrice(item.product.price)}
                </p>
                <p className="text-sm text-gray-600">
                  = {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Information */}
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Thông tin thanh toán</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Phương thức:</span>
            <span className="font-medium">
              {checkoutState.paymentInfo?.method.name}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Phương thức vận chuyển:</span>
            <span className="font-medium">{checkoutState.shippingMethod.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Tổng tiền:</span>
            <span className="font-bold text-blue-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-blue-600" />
          <div>
            <h4 className="font-medium text-blue-900">Trạng thái đơn hàng</h4>
            <p className="text-sm text-blue-700">
              {checkoutState.paymentInfo?.method.type === 'qr' || checkoutState.paymentInfo?.method.type === 'bank_transfer'
                ? 'Đang chờ xác nhận thanh toán'
                : 'Đã xác nhận, đang chuẩn bị hàng'
              }
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Chúng tôi sẽ gửi email cập nhật trạng thái đơn hàng
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onComplete}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Đang xử lý đơn hàng...</span>
            </div>
          ) : (
            'Hoàn tất đặt hàng'
          )}
        </button>

        <button
          onClick={() => window.print()}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
        >
          <Download className="w-4 h-4 mr-2" />
          In hóa đơn
        </button>
      </div>

      {/* Next Steps */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">Bước tiếp theo:</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          {checkoutState.paymentInfo?.method.type === 'qr' || checkoutState.paymentInfo?.method.type === 'bank_transfer' ? (
            <>
              <li>• Thực hiện thanh toán theo thông tin đã cung cấp</li>
              <li>• Chúng tôi sẽ xác nhận thanh toán trong vòng 1-2 giờ</li>
              <li>• Đơn hàng sẽ được chuẩn bị và giao trong {checkoutState.shippingMethod.estimatedDays}</li>
            </>
          ) : (
            <>
              <li>• Đơn hàng đang được chuẩn bị</li>
              <li>• Giao hàng trong {checkoutState.shippingMethod.estimatedDays}</li>
              <li>• Thanh toán khi nhận hàng</li>
            </>
          )}
          <li>• Theo dõi trạng thái đơn hàng qua email hoặc hotline</li>
        </ul>
      </div>
    </div>
  );
};

export default OrderConfirmation; 