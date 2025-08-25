import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSupabase } from '../context/SupabaseContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems, toggleCart } = useCart();
  const { user } = useSupabase();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/products' },
    { name: 'Liên hệ', path: '/contact' }
  ];

  // Shipping messages for scrolling animation
  const shippingMessages = [
    "🚚 Miễn phí vận chuyển cho đơn hàng trên 5.000.000₫",
    "🎁 Tặng kèm sample nước hoa cao cấp cho mọi đơn hàng",
    "⏰ Giao hàng nhanh trong 24h tại TP.HCM và Hà Nội",
    "💎 Sản phẩm chính hãng 100% - Đổi trả trong 30 ngày",
    "✨ Ưu đãi đặc biệt - Giảm 10% cho khách hàng mới"
  ];

  const scrollingText = shippingMessages.join('  •  ') + '  •  ' + shippingMessages.join('  •  ');

  return (
    <header id="main-header" className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar - MOBILE-OPTIMIZED LAYOUT */}
      <div id="header-top-bar" className="bg-elegant-900 text-white relative">
        {/* MOBILE VERSION: Contact-focused layout */}
        <div className="sm:hidden">
          <div className="flex justify-between items-center px-4 py-1.5">
            <div className="flex items-center space-x-3">
              <span className="text-gold-200 font-medium text-xs">📞 1900 2345</span>
              <span className="text-gray-400">•</span>
              <span className="text-gold-200 font-medium text-xs">📧 support@rareparfume.vn</span>
            </div>
            <div className="text-xs text-gray-300">
              🕒 8:00-22:00
            </div>
          </div>
          {/* Compact scrolling promotion */}
          <div className="bg-gradient-to-r from-primary-800 to-gold-700 py-1">
            <div className="header-scrolling-container h-5">
              <div className="header-scrolling-text text-white font-medium text-xs">
                🚚 Miễn phí ship 5tr+ • 🎁 Tặng sample mọi đơn • ⚡ Giao 24h HCM/HN • 💎 Chính hãng 100%
              </div>
            </div>
          </div>
        </div>

        {/* TABLET & DESKTOP VERSION: Original layout */}
        <div className="hidden sm:block py-1 sm:py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              {/* Scrolling shipping info */}
              <div className="flex-1 header-scrolling-container h-6 sm:h-8 mr-4">
                <div className="header-scrolling-text header-scrolling-instant text-gold-200 font-medium text-xs sm:text-sm">
                  {scrollingText}
                </div>
              </div>
              
              {/* Contact info */}
              <div className="flex space-x-4 flex-shrink-0">
                <span className="text-gray-300 text-xs sm:text-sm whitespace-nowrap">📞 1900 2345</span>
                <span className="text-gray-500 hidden md:inline">|</span>
                <span className="text-gray-300 hidden md:inline text-xs sm:text-sm whitespace-nowrap">📧 support@rareparfume.vn</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20 header-marquee pointer-events-none"></div>
      </div>

      {/* Main header - OPTIMIZED SPACING FOR MOBILE */}
      <div id="header-main-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="header-main-content" className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo - MOBILE-FRIENDLY BRAND DISPLAY */}
          <Link to="/" id="header-logo-link" className="flex items-center space-x-2">
            <div id="header-logo-icon" className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-gold-500 rounded-lg flex items-center justify-center">
              <span id="header-logo-text" className="text-white font-bold text-lg sm:text-xl">R</span>
            </div>
            {/* MOBILE: Compact brand name */}
            <div id="header-brand-info" className="block">
              <h1 id="header-brand-name" className="text-base sm:text-xl md:text-2xl font-serif font-bold text-elegant-900">
                Rare Parfume
              </h1>
              <p id="header-brand-tagline" className="text-xs text-elegant-500 -mt-1">
                Luxury Fragrance Collection
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav id="header-desktop-nav" className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                id={`header-nav-${item.name.toLowerCase().replace(' ', '-')}`}
                to={item.path}
                className="text-elegant-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              to={user ? "/profile" : "/login"}
              className="text-elegant-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
            >
              {user ? "Tài khoản" : "Đăng nhập"}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Search Bar - HIDDEN ON MOBILE */}
          <form id="header-search-form" onSubmit={handleSearch} className="hidden lg:flex items-center">
            <div id="header-search-container" className="relative">
              <input
                id="header-search-input"
                type="text"
                placeholder="Tìm kiếm nước hoa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-4 pr-10 py-2 border border-elegant-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                id="header-search-button"
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-elegant-400 hover:text-primary-600"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Action buttons - COMPACT MOBILE LAYOUT */}
          <div id="header-actions" className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile search - MOVED TO MENU */}
            
            {/* User account */}
            <Link
              to={user ? "/profile" : "/login"}
              className="relative text-elegant-700 hover:text-primary-600 transition-colors duration-200 p-2 touch-target"
            >
              <User size={20} className="sm:w-6 sm:h-6" />
              {user && (
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 text-white text-xs rounded-full w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center"></span>
              )}
            </Link>
            
            {/* Cart - LARGER TOUCH TARGET */}
            <button
              id="header-cart-button"
              onClick={toggleCart}
              className="relative text-elegant-700 hover:text-primary-600 transition-colors duration-200 p-2 touch-target"
            >
              <ShoppingBag size={20} className="sm:w-6 sm:h-6" />
              {getTotalItems() > 0 && (
                <span id="header-cart-badge" className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium">
                  {getTotalItems() > 99 ? '99+' : getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile menu button - IMPROVED TOUCH TARGET */}
            <button
              id="header-mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-elegant-700 hover:text-primary-600 p-2 touch-target"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - ENHANCED LAYOUT */}
      {isMenuOpen && (
        <div id="header-mobile-menu" className="md:hidden bg-white border-t border-elegant-200 shadow-lg">
          <div id="header-mobile-menu-content" className="px-4 py-4 space-y-4">
            {/* PRIORITY: Contact info at top */}
            <div className="bg-gradient-to-r from-primary-50 to-gold-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-elegant-900 mb-2">Liên hệ ngay</h3>
              <div className="space-y-2">
                <a href="tel:19002345" className="flex items-center space-x-3 text-primary-600 hover:text-primary-700">
                  <span className="text-lg">📞</span>
                  <div>
                    <span className="font-medium text-base">1900 2345</span>
                    <span className="block text-xs text-gray-600">Hotline 24/7</span>
                  </div>
                </a>
                <a href="mailto:support@rareparfume.vn" className="flex items-center space-x-3 text-primary-600 hover:text-primary-700">
                  <span className="text-lg">📧</span>
                  <div>
                    <span className="font-medium text-sm">support@rareparfume.vn</span>
                    <span className="block text-xs text-gray-600">Hỗ trợ email</span>
                  </div>
                </a>
                <div className="flex items-center space-x-3 text-gray-600">
                  <span className="text-lg">🕒</span>
                  <div>
                    <span className="font-medium text-sm">8:00 - 22:00</span>
                    <span className="block text-xs text-gray-500">Phục vụ hàng ngày</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile search */}
            <form id="header-mobile-search-form" onSubmit={handleSearch}>
              <div id="header-mobile-search-container" className="relative">
                <input
                  id="header-mobile-search-input"
                  type="text"
                  placeholder="Tìm kiếm nước hoa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-elegant-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
                />
                <button
                  id="header-mobile-search-submit"
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-elegant-400 p-2 touch-target"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Mobile navigation */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  id={`header-mobile-nav-${item.name.toLowerCase().replace(' ', '-')}`}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-2 text-elegant-700 hover:text-primary-600 hover:bg-elegant-50 font-medium transition-colors duration-200 rounded-lg touch-target"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to={user ? "/profile" : "/login"}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 px-2 text-elegant-700 hover:text-primary-600 hover:bg-elegant-50 font-medium transition-colors duration-200 rounded-lg touch-target"
              >
                {user ? "Tài khoản" : "Đăng nhập"}
              </Link>
            </div>

            {/* Quick actions */}
            <div className="pt-2 border-t border-elegant-200">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="py-2 px-3 bg-elegant-50 rounded-lg">
                  <div className="text-lg mb-1">🚚</div>
                  <div className="text-xs text-gray-600">Miễn phí ship</div>
                </div>
                <div className="py-2 px-3 bg-elegant-50 rounded-lg">
                  <div className="text-lg mb-1">💎</div>
                  <div className="text-xs text-gray-600">Chính hãng</div>
                </div>
                <div className="py-2 px-3 bg-elegant-50 rounded-lg">
                  <div className="text-lg mb-1">🔄</div>
                  <div className="text-xs text-gray-600">Đổi trả 30d</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 