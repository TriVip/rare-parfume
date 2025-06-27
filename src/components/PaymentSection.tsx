import React, { useState } from 'react';
import { CreditCard, QrCode, ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { PaymentMethod, PaymentInfo } from '../types';

interface PaymentSectionProps {
  total: number;
  onComplete: (data: PaymentInfo) => void;
  onBack: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  total,
  onComplete,
  onBack
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'qr',
      type: 'qr',
      name: 'Quét mã QR',
      description: 'Thanh toán nhanh chóng qua ứng dụng ngân hàng',
      icon: '📱',
      isEnabled: true
    },
    {
      id: 'bank_transfer',
      type: 'bank_transfer',
      name: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản trực tiếp đến tài khoản',
      icon: '🏦',
      isEnabled: true
    },
    {
      id: 'cash',
      type: 'cash',
      name: 'Thanh toán khi nhận hàng',
      description: 'Thanh toán bằng tiền mặt khi giao hàng',
      icon: '💵',
      isEnabled: true
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handlePaymentComplete = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const paymentInfo: PaymentInfo = {
      method: selectedMethod,
      amount: total,
      currency: 'VND',
      transactionId: `TX${Date.now()}`,
      ...(selectedMethod.type === 'qr' && {
        qrCodeUrl: '/api/qr-code' // Placeholder - you'll replace with actual QR code
      }),
      ...(selectedMethod.type === 'bank_transfer' && {
        bankDetails: {
          bankName: 'Ngân hàng của bạn',
          accountNumber: 'XXXX-XXXX-XXXX',
          accountHolder: 'Tên chủ tài khoản'
        }
      })
    };

    setIsProcessing(false);
    onComplete(paymentInfo);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Phương thức thanh toán
        </h3>
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Quay lại
        </button>
      </div>

      {/* Payment Amount */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">Tổng thanh toán</p>
          <p className="text-2xl font-bold text-blue-600">{formatPrice(total)}</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod?.id === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${!method.isEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => method.isEnabled && handleMethodSelect(method)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod?.id === method.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedMethod?.id === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{method.icon}</span>
                  <h4 className="font-medium text-gray-900">{method.name}</h4>
                  {!method.isEnabled && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Không khả dụng
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Display */}
      {selectedMethod?.type === 'qr' && (
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="text-center">
            <QrCode className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h4 className="font-medium text-gray-900 mb-2">
              Quét mã QR để thanh toán
            </h4>
            
            {/* Placeholder QR Code */}
            <div className="w-64 h-64 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Mã QR sẽ được hiển thị tại đây
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  (Bạn sẽ thêm mã QR ngân hàng của mình)
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-700">
                  Vui lòng thanh toán trong vòng 15 phút
                </span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>Số tiền: <span className="font-medium">{formatPrice(total)}</span></p>
              <p>Nội dung: <span className="font-medium">Thanh toan don hang</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer Details */}
      {selectedMethod?.type === 'bank_transfer' && (
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <h4 className="font-medium text-gray-900 mb-4">
            Thông tin chuyển khoản
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Ngân hàng:</span>
              <span className="font-medium">Ngân hàng của bạn</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Số tài khoản:</span>
              <span className="font-medium">XXXX-XXXX-XXXX</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Chủ tài khoản:</span>
              <span className="font-medium">Tên chủ tài khoản</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Số tiền:</span>
              <span className="font-medium text-blue-600">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Nội dung:</span>
              <span className="font-medium">Thanh toan don hang</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 Vui lòng ghi đúng nội dung chuyển khoản để đơn hàng được xử lý nhanh chóng
            </p>
          </div>
        </div>
      )}

      {/* Cash on Delivery */}
      {selectedMethod?.type === 'cash' && (
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💵</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">
              Thanh toán khi nhận hàng
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Bạn sẽ thanh toán bằng tiền mặt khi nhận được sản phẩm
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">
                  Phương thức thanh toán an toàn và tiện lợi
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      {selectedMethod && (
        <div className="pt-4">
          <button
            onClick={handlePaymentComplete}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang xử lý...</span>
              </div>
            ) : (
              'Xác nhận thanh toán'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSection; 