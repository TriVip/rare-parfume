import React from 'react';
import { Truck, Clock, MapPin, Package, CheckCircle, AlertTriangle, Building, Building2, Mountain } from 'lucide-react';

const Shipping: React.FC = () => {
  const shippingZones = [
    {
      id: 'zone1',
      name: 'Nội thành HN & HCM',
      time: '1-2 ngày',
      cost: '30,000đ',
      freeShipping: '500,000đ',
      icon: Building,
      color: 'blue'
    },
    {
      id: 'zone2',
      name: 'Các tỉnh thành khác',
      time: '3-5 ngày',
      cost: '45,000đ',
      freeShipping: '800,000đ',
      icon: Building2,
      color: 'green'
    },
    {
      id: 'zone3',
      name: 'Vùng sâu, vùng xa',
      time: '5-7 ngày',
      cost: '60,000đ',
      freeShipping: '1,000,000đ',
      icon: Mountain,
      color: 'orange'
    }
  ];

  const shippingMethods = [
    {
      name: 'Giao hàng tiêu chuẩn',
      description: 'Giao hàng trong giờ hành chính',
      icon: Package,
      features: ['Theo dõi đơn hàng', 'Bảo hiểm hàng hóa', 'Hỗ trợ 24/7']
    },
    {
      name: 'Giao hàng nhanh',
      description: 'Giao hàng trong 24h (nội thành)',
      icon: Truck,
      features: ['Ưu tiên xử lý', 'Giao hàng cuối tuần', 'SMS thông báo']
    },
    {
      name: 'Giao hàng hẹn giờ',
      description: 'Giao hàng theo yêu cầu khách hàng',
      icon: Clock,
      features: ['Linh hoạt thời gian', 'Xác nhận trước', 'Phụ phí 20,000đ']
    }
  ];

  const trackingSteps = [
    { step: 'Xác nhận đơn hàng', status: 'completed', time: '10:30 AM' },
    { step: 'Đóng gói sản phẩm', status: 'completed', time: '11:15 AM' },
    { step: 'Bàn giao vận chuyển', status: 'current', time: '14:20 PM' },
    { step: 'Đang vận chuyển', status: 'pending', time: '' },
    { step: 'Giao hàng thành công', status: 'pending', time: '' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6">
            <Truck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Chính Sách Vận Chuyển
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dịch vụ giao hàng nhanh chóng, an toàn trên toàn quốc
          </p>
        </div>

        {/* Shipping Zones */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Khu Vực Giao Hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingZones.map((zone, index) => (
              <div
                key={zone.id}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <zone.icon className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{zone.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Thời gian:</span>
                    <span className="font-medium text-gray-800">{zone.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Phí ship:</span>
                    <span className="font-medium text-gray-800">{zone.cost}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Miễn phí từ:</span>
                    <span className="font-medium text-orange-600">{zone.freeShipping}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            Phương Thức Giao Hàng
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {shippingMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 animate-slide-up"
                style={{ animationDelay: `${0.8 + index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  <method.icon className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">{method.name}</h3>
                </div>
                <p className="text-gray-600 mb-6">{method.description}</p>
                <div className="space-y-2">
                  {method.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Tracking */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 animate-slide-up" style={{ animationDelay: '1s' }}>
            Theo Dõi Đơn Hàng
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '1.2s' }}>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-bold text-orange-600">#DH123456</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Dự kiến giao hàng:</span>
                <span className="font-medium text-gray-800">25/12/2024</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-4 flex-shrink-0 ${
                    step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'current' ? 'bg-orange-500 animate-pulse' :
                    'bg-gray-300'
                  }`}></div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${
                        step.status === 'completed' ? 'text-green-600' :
                        step.status === 'current' ? 'text-orange-600' :
                        'text-gray-400'
                      }`}>
                        {step.step}
                      </span>
                      {step.time && (
                        <span className="text-sm text-gray-500">{step.time}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg animate-slide-up" style={{ animationDelay: '1.4s' }}>
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Lưu ý địa chỉ</h3>
                <p className="text-blue-700 text-sm">
                  Vui lòng cung cấp địa chỉ chính xác và số điện thoại để shipper có thể liên hệ.
                  Không giao hàng vào các ngày lễ, tết.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg animate-slide-up" style={{ animationDelay: '1.6s' }}>
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Kiểm tra hàng hóa</h3>
                <p className="text-yellow-700 text-sm">
                  Khách hàng có quyền kiểm tra sản phẩm trước khi thanh toán COD.
                  Từ chối nhận hàng nếu sản phẩm không đúng hoặc bị hỏng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center animate-slide-up" style={{ animationDelay: '1.8s' }}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Cần hỗ trợ về vận chuyển?
          </h2>
          <p className="text-gray-600 mb-6">
            Liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+84123456789"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              <Truck className="w-5 h-5 mr-2" />
              Hotline vận chuyển
            </a>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <Package className="w-5 h-5 mr-2" />
              Tra cứu đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping; 