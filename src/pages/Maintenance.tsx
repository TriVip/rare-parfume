import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Heart, Sparkles, Clock, ArrowRight, HelpCircle, Shield, Truck, Wrench } from 'lucide-react';

const Maintenance: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const floatingItems = [
    { icon: Heart, delay: 0, x: 10, y: 20 },
    { icon: Sparkles, delay: 1, x: 80, y: 10 },
    { icon: Settings, delay: 2, x: 20, y: 70 },
    { icon: Clock, delay: 1.5, x: 85, y: 80 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300/20 rounded-lg animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-300/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 bg-green-300/20 rotate-45 animate-spin"></div>
        
        {/* Floating icons */}
        {floatingItems.map((item, index) => (
          <div
            key={index}
            className="absolute animate-bounce"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: '3s'
            }}
          >
            <item.icon className="w-8 h-8 text-white/30" />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Animated main icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
            <Wrench className="w-16 h-16 text-white animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute -inset-4 bg-white/10 rounded-full animate-ping"></div>
        </div>

        {/* Title with animation */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in opacity-0 flex items-center justify-center gap-4">
          <Settings className="w-12 h-12 md:w-16 md:h-16" />
          Đang Bảo Trì
        </h1>
        
        {/* Animated subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-2 animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          Chúng tôi đang nâng cấp hệ thống{dots}
        </p>
        
        <p className="text-lg text-white/80 mb-12 max-w-2xl animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          Trang web sẽ sớm trở lại với những tính năng tuyệt vời hơn! 
          Trong thời gian này, bạn có thể tham khảo các thông tin hữu ích bên dưới.
        </p>

        {/* Animated links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {[
            { to: '/faq', title: 'Câu Hỏi Thường Gặp', desc: 'Tìm câu trả lời nhanh chóng', icon: HelpCircle },
            { to: '/warranty', title: 'Chính Sách Bảo Hành', desc: 'Thông tin về bảo hành sản phẩm', icon: Shield },
            { to: '/shipping', title: 'Chính Sách Vận Chuyển', desc: 'Chi tiết về giao hàng', icon: Truck }
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-slide-up opacity-0"
              style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'both' }}
            >
              <div className="text-4xl mb-4 group-hover:animate-bounce flex justify-center">
                <link.icon className="w-12 h-12 text-white/90" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                {link.title}
              </h3>
              <p className="text-white/80 mb-4">{link.desc}</p>
              <div className="flex items-center justify-center text-white/60 group-hover:text-white transition-colors">
                <span className="mr-2">Xem chi tiết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Expected return time */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
          <Clock className="w-8 h-8 text-white mx-auto mb-4 animate-pulse" />
          <p className="text-white/90 text-lg">
            Dự kiến hoàn thành: <span className="font-bold text-yellow-300">24 giờ</span>
          </p>
          <p className="text-white/70 text-sm mt-2 flex items-center justify-center gap-2">
            Cảm ơn bạn đã kiên nhẫn chờ đợi! 
            <Heart className="w-4 h-4 text-pink-300 animate-pulse" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance; 