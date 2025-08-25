import React, { useState } from 'react';
import { Shield, Clock, CheckCircle, AlertCircle, FileText, Phone, Mail, User, Users, Star, Gift, Gem } from 'lucide-react';

const Warranty: React.FC = () => {
  const [activeTab, setActiveTab] = useState('policy');

  const warrantyPeriods = [
    { category: 'Nước hoa nam', period: '12 tháng', icon: User, color: 'blue' },
    { category: 'Nước hoa nữ', period: '12 tháng', icon: Users, color: 'pink' },
    { category: 'Nước hoa unisex', period: '12 tháng', icon: Star, color: 'purple' },
    { category: 'Set quà tặng', period: '6 tháng', icon: Gift, color: 'yellow' },
    { category: 'Phụ kiện', period: '3 tháng', icon: Gem, color: 'green' }
  ];

  const warrantySteps = [
    {
      step: 1,
      title: 'Liên hệ hỗ trợ',
      description: 'Gọi hotline hoặc gửi email với thông tin sản phẩm',
      icon: Phone
    },
    {
      step: 2,
      title: 'Cung cấp thông tin',
      description: 'Cung cấp hóa đơn, ảnh sản phẩm và mô tả vấn đề',
      icon: FileText
    },
    {
      step: 3,
      title: 'Đánh giá và xử lý',
      description: 'Chúng tôi sẽ đánh giá và đưa ra phương án xử lý',
      icon: CheckCircle
    },
    {
      step: 4,
      title: 'Nhận sản phẩm mới',
      description: 'Nhận sản phẩm thay thế hoặc được hoàn tiền',
      icon: Shield
    }
  ];

  const exclusions = [
    'Sản phẩm bị hỏng do sử dụng sai cách',
    'Sản phẩm bị rơi vỡ do tác động ngoại lực',
    'Sản phẩm đã qua sử dụng hơn 50%',
    'Không còn hóa đơn mua hàng',
    'Sản phẩm mua từ đại lý không chính thức'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-full mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Chính Sách Bảo Hành
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cam kết chất lượng với chính sách bảo hành toàn diện
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {[
            { id: 'policy', label: 'Chính sách', icon: Shield },
            { id: 'periods', label: 'Thời gian bảo hành', icon: Clock },
            { id: 'process', label: 'Quy trình', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'policy' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Warranty Coverage */}
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <CheckCircle className="w-7 h-7 text-emerald-500 mr-3" />
                  Được bảo hành
                </h2>
                <div className="space-y-4">
                  {[
                    'Lỗi kỹ thuật từ nhà sản xuất',
                    'Chai lọ bị nứt, vỡ khi vận chuyển',
                    'Nước hoa bị đổi màu, kết tủa bất thường',
                    'Vòi xịt hoặc nắp chai bị hỏng',
                    'Sản phẩm không đúng mô tả'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warranty Exclusions */}
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <AlertCircle className="w-7 h-7 text-red-500 mr-3" />
                  Không được bảo hành
                </h2>
                <div className="space-y-4">
                  {exclusions.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'periods' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {warrantyPeriods.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex justify-center mb-4">
                    <item.icon className="w-12 h-12 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.category}</h3>
                  <div className={`text-2xl font-bold mb-4 text-${item.color}-600`}>
                    {item.period}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Bảo hành kể từ ngày mua hàng
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'process' && (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {warrantySteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg p-6 md:p-8 animate-slide-up"
                    style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 md:mb-0 md:mr-6">
                      {step.step}
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center md:justify-start">
                        <step.icon className="w-6 h-6 text-emerald-500 mr-2" />
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-6 md:p-8 animate-slide-up" style={{ animationDelay: '1s' }}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Cần hỗ trợ bảo hành?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-emerald-50 rounded-lg">
              <Phone className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Hotline bảo hành</h3>
              <p className="text-emerald-600 font-medium text-xl">1900 123 456</p>
              <p className="text-gray-600 text-sm mt-2">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
            </div>
            <div className="text-center p-6 bg-emerald-50 rounded-lg">
              <Mail className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email bảo hành</h3>
              <p className="text-emerald-600 font-medium text-xl">warranty@example.com</p>
              <p className="text-gray-600 text-sm mt-2">Phản hồi trong vòng 24h</p>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg animate-slide-up" style={{ animationDelay: '1.2s' }}>
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Lưu ý quan trọng</h3>
              <p className="text-yellow-700">
                Vui lòng bảo quản hóa đơn mua hàng và kiểm tra sản phẩm ngay khi nhận hàng. 
                Mọi yêu cầu bảo hành cần được thực hiện trong thời gian quy định.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warranty; 