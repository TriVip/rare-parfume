import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-elegant-900 text-white">
      {/* MOBILE COMPACT LAYOUT */}
      <div className="md:hidden">
        {/* Mobile Essential Info */}
        <div className="py-4 px-4">
          {/* Brand & Contact */}
          <div className="text-center space-y-3 mb-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h3 className="text-lg font-serif font-bold">Rare Parfume</h3>
            </div>
            <p className="text-elegant-300 text-xs leading-relaxed max-w-xs mx-auto">
              Nước hoa cao cấp, chính hãng từ khắp thế giới
            </p>
          </div>

          {/* Mobile Contact Grid */}
          <div className="grid grid-cols-2 gap-4 text-center text-xs mb-4">
            <div className="bg-elegant-800 p-3 rounded-lg">
              <Phone size={14} className="text-primary-400 mx-auto mb-1" />
              <a href="tel:+8419002345" className="text-elegant-300 hover:text-white font-medium block">
                1900 2345
              </a>
              <span className="text-elegant-500 text-xs">Hotline</span>
            </div>
            <div className="bg-elegant-800 p-3 rounded-lg">
              <Mail size={14} className="text-primary-400 mx-auto mb-1" />
              <a href="mailto:support@rareparfume.vn" className="text-elegant-300 hover:text-white font-medium block text-xs">
                Email hỗ trợ
              </a>
              <span className="text-elegant-500 text-xs">24/7</span>
            </div>
          </div>

          {/* Mobile Quick Links */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
            <Link to="/products" className="text-elegant-300 hover:text-white py-2 px-1 bg-elegant-800/50 rounded transition-colors">
              Sản phẩm
            </Link>
            <Link to="/contact" className="text-elegant-300 hover:text-white py-2 px-1 bg-elegant-800/50 rounded transition-colors">
              Liên hệ
            </Link>
            <Link to="/shipping" className="text-elegant-300 hover:text-white py-2 px-1 bg-elegant-800/50 rounded transition-colors">
              Vận chuyển
            </Link>
          </div>

          {/* Mobile Social & Hours */}
          <div className="flex justify-between items-center text-xs">
            <div className="flex space-x-3">
              <a href="https://facebook.com/rareparfume" target="_blank" rel="noopener noreferrer" className="text-elegant-400 hover:text-primary-400 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://instagram.com/rareparfume" target="_blank" rel="noopener noreferrer" className="text-elegant-400 hover:text-primary-400 transition-colors">
                <Instagram size={16} />
              </a>
            </div>
            <div className="text-elegant-400 text-right">
              <div>T2-T6: 9:00-18:00</div>
              <div>T7,CN: 9:00-17:00</div>
            </div>
          </div>
        </div>

        {/* Mobile Copyright */}
        <div className="border-t border-elegant-800 py-3 px-4">
          <div className="text-center text-xs text-elegant-400">
            © 2024 Rare Parfume. All rights reserved.
          </div>
          <div className="flex justify-center space-x-4 mt-2 text-xs">
            <Link to="/privacy" className="text-elegant-500 hover:text-white">Bảo mật</Link>
            <Link to="/terms" className="text-elegant-500 hover:text-white">Điều khoản</Link>
          </div>
        </div>
      </div>

      {/* DESKTOP & TABLET LAYOUT */}
      <div className="hidden md:block">
        {/* Main Footer */}
        <div className="py-6 sm:py-8 md:py-12">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Company Info */}
              <div className="space-y-3 sm:space-y-4 col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-gold-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">R</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold">Rare Parfume</h3>
                    <p className="text-xs text-elegant-400">Luxury Fragrance Collection</p>
                  </div>
                </div>
                <p className="text-elegant-300 text-sm leading-relaxed">
                  Chuyên cung cấp các dòng nước hoa cao cấp, độc đáo và sang trọng từ khắp nơi trên thế giới.
                </p>
                <div className="flex space-x-4">
                  <a href="https://facebook.com/rareparfume" target="_blank" rel="noopener noreferrer" className="text-elegant-400 hover:text-primary-400 transition-colors duration-200 touch-target">
                    <Facebook size={20} />
                  </a>
                  <a href="https://instagram.com/rareparfume" target="_blank" rel="noopener noreferrer" className="text-elegant-400 hover:text-primary-400 transition-colors duration-200 touch-target">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Liên kết nhanh</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="text-elegant-300 hover:text-white transition-colors duration-200 touch-target py-1 block">Về chúng tôi</Link></li>
                  <li><Link to="/products" className="text-elegant-300 hover:text-white transition-colors duration-200 touch-target py-1 block">Sản phẩm</Link></li>
                  <li><Link to="/blog" className="text-elegant-300 hover:text-white transition-colors duration-200 touch-target py-1 block">Blog</Link></li>
                  <li><Link to="/contact" className="text-elegant-300 hover:text-white transition-colors duration-200 touch-target py-1 block">Liên hệ</Link></li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Dịch vụ khách hàng</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/shipping" className="text-elegant-300 hover:text-white transition-colors duration-200 touch-target py-1 block">Chính sách vận chuyển</Link></li>
                  <li><Link to="/returns" className="text-elegant-300 hover:text-white transition-colors duration-200 touch-target py-1 block">Đổi trả hàng</Link></li>
                  <li><Link to="/faq" className="text-elegant-300 hover:text-white transition-colors duration-200 touch-target py-1 block">FAQ</Link></li>
                  <li><Link to="/warranty" className="text-elegant-300 hover:text-white transition-colors duration-200 touch-target py-1 block">Bảo hành</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Thông tin liên hệ</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <MapPin size={16} className="text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-elegant-300 leading-relaxed">
                        123 Đường Nguyễn Huệ, Quận 1,<br />
                        TP.HCM, Việt Nam
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-primary-400 flex-shrink-0" />
                    <a href="tel:+8419002345" className="text-elegant-300 hover:text-white transition-colors touch-target">
                      +84 1900 2345
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-primary-400 flex-shrink-0" />
                    <a href="mailto:support@rareparfume.vn" className="text-elegant-300 hover:text-white transition-colors touch-target break-all">
                      support@rareparfume.vn
                    </a>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-6">
                  <p className="text-xs text-elegant-400 leading-relaxed">
                    <strong>Giờ làm việc:</strong><br />
                    T2-T6: 9:00-18:00 | T7: 9:00-17:00<br />
                    CN: 10:00-16:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Bar */}
        <div className="border-t border-elegant-800 py-3 sm:py-4 md:py-6">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
              <div className="text-xs sm:text-sm text-elegant-400 text-center sm:text-left">
                © 2024 Rare Parfume. Tất cả quyền được bảo lưu.
              </div>
              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 md:space-x-6 text-xs sm:text-sm text-center">
                <Link to="/privacy" className="text-elegant-400 hover:text-white transition-colors duration-200 touch-target py-1">
                  Chính sách bảo mật
                </Link>
                <Link to="/terms" className="text-elegant-400 hover:text-white transition-colors duration-200 touch-target py-1">
                  Điều khoản sử dụng
                </Link>
                <Link to="/cookies" className="text-elegant-400 hover:text-white transition-colors duration-200 touch-target py-1">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 