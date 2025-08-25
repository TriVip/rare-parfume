import React from 'react';
import { MapPin, Phone, Mail, Clock, Heart, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Địa chỉ showroom',
      details: [
        '136/4 Trần Quang Diệu, Phường 14',
        'Quận 3, TP. Hồ Chí Minh'
      ],
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      icon: Phone,
      title: 'Hotline',
      details: [
        '1900 2345 (Miễn phí)',
        '028 3823 4567'
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'support@rareparfume.vn',
        'sale@rareparfume.vn'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Clock,
      title: 'Giờ mở cửa',
      details: [
        'Thứ 2 - Thứ 6: 9:00 - 21:00',
        'Thứ 7 - CN: 9:00 - 22:00'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div id="about-page" className="min-h-screen">
      <Header />
      
      {/* Hero Section - MOBILE OPTIMIZED */}
      <section id="about-hero" className="relative h-48 sm:h-60 md:h-72 lg:h-80 xl:h-96 flex items-center justify-center luxury-gradient overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-3 sm:inset-4 md:inset-8 lg:inset-16 xl:inset-32 bg-black/8 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl backdrop-blur-sm animate-pulse"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-8 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 bg-gradient-to-br from-primary-300/20 to-purple-400/20 sm:from-primary-300/30 sm:to-purple-400/30 morphing-shape"></div>
          <div className="hidden sm:block absolute bottom-12 right-12 w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-24 xl:h-24 bg-gradient-to-br from-gold-300/25 to-orange-400/25 sm:from-gold-300/40 sm:to-orange-400/30 morphing-shape" style={{animationDelay: '2s'}}></div>
          
          <div className="absolute top-12 right-16 opacity-60 sm:opacity-80">
            <Sparkles className="text-gold-400 animate-pulse w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
          </div>
          <div className="absolute bottom-16 left-12 opacity-40 sm:opacity-60">
            <Heart className="text-primary-400 animate-pulse w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" style={{animationDelay: '2.5s'}} />
          </div>
        </div>
        
        {/* Hero Content - MOBILE COMPACT */}
        <div id="about-hero-content" className="relative z-10 text-center max-w-4xl mx-auto container-padding">
          <h1 id="about-hero-title" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-elegant-900 mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight">
            Về chúng tôi
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-gold-600 mt-1 sm:mt-2">
              Rare Parfume
            </span>
          </h1>
          <p id="about-hero-subtitle" className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-elegant-600 leading-relaxed max-w-[400px] sm:max-w-[500px] md:max-w-[700px] mx-auto px-4">
            Đối tác tin cậy cho hành trình khám phá thế giới hương thơm đẳng cấp
          </p>
        </div>
        
        {/* Floating Elements - MOBILE COMPACT */}
        <div className="absolute top-6 left-6 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-200/40 to-purple-300/40 sm:from-primary-200/60 sm:to-purple-300/60 rounded-full floating-element opacity-60 sm:opacity-80 backdrop-blur-sm"></div>
        <div className="absolute bottom-6 right-6 w-4 h-4 sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-gold-200/50 to-orange-300/50 sm:from-gold-200/70 sm:to-orange-300/60 rounded-full floating-element-reverse opacity-70 sm:opacity-90 backdrop-blur-sm"></div>
      </section>

      {/* Contact Information Section - MOBILE OPTIMIZED */}
      <section id="about-contact" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header - MOBILE OPTIMIZED */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-elegant-900 mb-2 sm:mb-3 md:mb-4 lg:mb-6">
              Thông tin liên hệ
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-elegant-600 leading-relaxed max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] mx-auto px-4">
              Chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn tìm được mùi hương hoàn hảo. 
              Hãy liên hệ với chúng tôi qua các kênh bên dưới.
            </p>
          </div>

          {/* Contact Cards Grid - MOBILE OPTIMIZED */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div 
                  key={index}
                  id={`contact-card-${index}`}
                  className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-elegant-100 group"
                >
                  {/* Icon - MOBILE COMPACT */}
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 lg:mb-6 transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent className={`${info.color} w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8`} />
                  </div>
                  
                  {/* Title - MOBILE COMPACT */}
                  <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-elegant-900 mb-1 sm:mb-3 lg:mb-4 text-center leading-tight">
                    {info.title}
                  </h3>
                  
                  {/* Details - MOBILE COMPACT */}
                  <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 text-center">
                    {info.details.map((detail, detailIndex) => (
                      <p 
                        key={detailIndex}
                        className="text-xs sm:text-sm lg:text-base text-elegant-600 leading-tight sm:leading-relaxed"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Contact Message - MOBILE OPTIMIZED */}
          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 text-center">
            <div className="bg-gradient-to-r from-primary-50 to-gold-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-primary-100">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-elegant-900 mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                  Cần tư vấn chuyên nghiệp?
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-elegant-600 leading-relaxed mb-3 sm:mb-4 lg:mb-6 px-2">
                  Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn tìm kiếm mùi hương phù hợp nhất. 
                  Từ việc lựa chọn sản phẩm đến chăm sóc sau bán hàng, chúng tôi cam kết mang đến 
                  trải nghiệm mua sắm tuyệt vời nhất.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center items-center">
                  <a 
                    href="tel:19002345"
                    className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-gold-600 hover:from-primary-700 hover:to-gold-700 text-white font-semibold px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg w-full sm:w-auto touch-target"
                  >
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    <span className="text-xs sm:text-sm lg:text-base">Gọi ngay: 1900 2345</span>
                  </a>
                  <a 
                    href="mailto:support@rareparfume.vn"
                    className="inline-flex items-center justify-center space-x-2 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg w-full sm:w-auto touch-target"
                  >
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    <span className="text-xs sm:text-sm lg:text-base">Gửi email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About; 