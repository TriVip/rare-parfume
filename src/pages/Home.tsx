import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Award, RefreshCw, Sparkles, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import HeroEffects from '../components/HeroEffects';
import { mockProducts } from '../data/mockData';

const Home: React.FC = () => {
  const featuredProducts = mockProducts.filter(product => product.isFeatured);
  const newProducts = mockProducts.filter(product => product.isNew);

  return (
    <div id="home-page" className="min-h-screen">
      <Header />
      
      {/* OPTIMIZED Hero Section for Mobile */}
      <section id="hero-section" className="relative h-72 sm:h-80 md:h-96 lg:h-[32rem] flex items-center justify-center luxury-gradient overflow-hidden">
        {/* Advanced Interactive Effects - SELECTIVE MOBILE DISPLAY */}
        <div className="hidden lg:block">
          <HeroEffects />
        </div>
        
        {/* Animated Background Overlay - ENHANCED */}
        <div id="hero-overlay" className="absolute inset-4 sm:inset-8 md:inset-16 lg:inset-32 bg-black/8 rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-sm animate-pulse"></div>
        
        {/* MOBILE-FRIENDLY Floating Particles */}
        <div id="hero-particles" className="absolute inset-0 pointer-events-none">
          {/* Large morphing shapes - MOBILE-ADAPTED */}
          <div id="hero-shape-1" className="absolute top-12 left-12 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-primary-300/20 to-purple-400/20 sm:from-primary-300/30 sm:to-purple-400/30 morphing-shape"></div>
          <div id="hero-shape-2" className="hidden sm:block absolute bottom-16 right-16 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-gold-300/25 to-orange-400/25 sm:from-gold-300/40 sm:to-orange-400/30 morphing-shape" style={{animationDelay: '2s'}}></div>
          
          {/* Small floating particles - MOBILE-OPTIMIZED */}
          <div id="hero-particle-1" className="absolute top-20 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-primary-400 rounded-full particle opacity-40 sm:opacity-60"></div>
          <div id="hero-particle-2" className="absolute bottom-32 right-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full particle opacity-30 sm:opacity-50" style={{animationDelay: '3s'}}></div>
          <div id="hero-particle-3" className="absolute top-32 right-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gold-400 rounded-full particle opacity-50" style={{animationDelay: '1.5s'}}></div>
          
          {/* Sparkle effects - MOBILE-FRIENDLY */}
          <div id="hero-sparkle-1" className="absolute top-16 right-20 opacity-60 sm:opacity-80">
            <Sparkles className="text-gold-400 animate-pulse w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </div>
          <div id="hero-sparkle-2" className="absolute bottom-20 left-16 opacity-40 sm:opacity-60">
            <Heart className="text-primary-400 animate-pulse w-3 h-3 sm:w-4 sm:h-4" style={{animationDelay: '2.5s'}} />
          </div>
        </div>
        
        {/* Main Content - MOBILE OPTIMIZED */}
        <div id="hero-content" className="relative z-10 text-center max-w-4xl mx-auto container-padding">
          <h1 id="hero-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-elegant-900 mb-3 sm:mb-4 md:mb-6 leading-tight hero-title">
            Khám Phá
            <span id="hero-brand" className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-gold-600 mt-1 sm:mt-2 animated-text">
              Rare Parfume
            </span>
          </h1>
          <p id="hero-subtitle" className="text-sm sm:text-base md:text-lg lg:text-xl text-elegant-600 leading-relaxed max-w-[500px] sm:max-w-[600px] mx-auto mb-4 sm:mb-6 md:mb-8 hero-subtitle px-4">
            Bộ sưu tập nước hoa cao cấp độc đáo, mang đến trải nghiệm hương thơm đẳng cấp thế giới
          </p>
          
          <div id="hero-cta" className="hero-button">
            <Link
              id="hero-cta-button"
              to="/products"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-gold-600 hover:from-primary-700 hover:to-gold-700 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg group touch-target relative overflow-hidden"
            >
              <span className="text-sm sm:text-base relative z-10">Khám phá ngay</span>
              <ArrowRight size={16} className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
            </Link>
          </div>
        </div>
        
        {/* MOBILE-FRIENDLY Floating Elements */}
        <div id="hero-float-1" className="absolute top-8 left-8 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary-200/40 to-purple-300/40 sm:from-primary-200/60 sm:to-purple-300/60 rounded-full floating-element opacity-60 sm:opacity-80 backdrop-blur-sm"></div>
        <div id="hero-float-2" className="absolute bottom-8 right-8 w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-gold-200/50 to-orange-300/50 sm:from-gold-200/70 sm:to-orange-300/60 rounded-full floating-element-reverse opacity-70 sm:opacity-90 backdrop-blur-sm"></div>
        <div id="hero-float-3" className="absolute top-1/3 right-12 w-4 h-4 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full floating-element opacity-50" style={{animationDelay: '3s'}}></div>
      </section>

      {/* Features Section - MOBILE OPTIMIZED */}
      <section id="features-section" className="section-padding bg-white">
        <div id="features-container" className="max-w-7xl mx-auto container-padding">
          <div id="features-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div id="feature-shipping" className="text-center feature-card">
              <div id="feature-shipping-icon" className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 feature-icon">
                <Truck className="text-primary-600" size={18} />
              </div>
              <h3 id="feature-shipping-title" className="text-sm sm:text-base md:text-lg font-semibold text-elegant-900 mb-1 sm:mb-2">Miễn phí vận chuyển</h3>
              <p id="feature-shipping-desc" className="text-elegant-600 text-xs sm:text-sm">Đơn hàng trên 5.000.000₫</p>
            </div>
            <div id="feature-authentic" className="text-center feature-card">
              <div id="feature-authentic-icon" className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 feature-icon">
                <Shield className="text-primary-600" size={18} />
              </div>
              <h3 id="feature-authentic-title" className="text-sm sm:text-base md:text-lg font-semibold text-elegant-900 mb-1 sm:mb-2">Hàng chính hãng</h3>
              <p id="feature-authentic-desc" className="text-elegant-600 text-xs sm:text-sm">100% authentic</p>
            </div>
            <div id="feature-return" className="text-center feature-card">
              <div id="feature-return-icon" className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 feature-icon">
                <RefreshCw className="text-primary-600" size={18} />
              </div>
              <h3 id="feature-return-title" className="text-sm sm:text-base md:text-lg font-semibold text-elegant-900 mb-1 sm:mb-2">Đổi trả 30 ngày</h3>
              <p id="feature-return-desc" className="text-elegant-600 text-xs sm:text-sm">Không hài lòng hoàn tiền</p>
            </div>
            <div id="feature-support" className="text-center feature-card">
              <div id="feature-support-icon" className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 feature-icon">
                <Award className="text-primary-600" size={18} />
              </div>
              <h3 id="feature-support-title" className="text-sm sm:text-base md:text-lg font-semibold text-elegant-900 mb-1 sm:mb-2">Tư vấn chuyên nghiệp</h3>
              <p id="feature-support-desc" className="text-elegant-600 text-xs sm:text-sm">Từ các chuyên gia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - MOBILE OPTIMIZED GRID */}
      <section id="featured-products-section" className="section-padding bg-elegant-50">
        <div id="featured-products-container" className="max-w-7xl mx-auto container-padding">
          <div id="featured-products-header" className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            <h2 id="featured-products-title" className="heading-mobile font-serif font-bold text-elegant-900 mb-2 sm:mb-3 md:mb-4 section-title">
              Sản phẩm nổi bật
            </h2>
            <p id="featured-products-subtitle" className="text-sm sm:text-base md:text-lg text-elegant-600 max-w-xl sm:max-w-2xl mx-auto section-subtitle px-4">
              Những chai nước hoa được yêu thích nhất từ bộ sưu tập Rare Parfume
            </p>
          </div>
          
          {/* MOBILE-OPTIMIZED: 2 columns on mobile with centered odd items */}
          <div id="featured-products-grid" className="mobile-grid-center-last gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            {featuredProducts.slice(0, 3).map((product, index) => (
              <div key={product.id} id={`featured-product-${index}`} className="product-card-enhanced">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {/* MOBILE-OPTIMIZED CTA BUTTON */}
          <div id="featured-products-cta" className="text-center px-4">
            <Link
              id="featured-products-link"
              to="/products?filter=featured"
              className="btn-primary inline-flex items-center justify-center space-x-2 touch-target hero-button w-full sm:w-auto max-w-sm mx-auto px-4 py-3 sm:px-6 sm:py-3"
            >
              <span className="text-sm sm:text-base">Xem tất cả sản phẩm nổi bật</span>
              <ArrowRight size={16} className="sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals - MOBILE OPTIMIZED GRID */}
      <section id="new-arrivals-section" className="section-padding bg-white">
        <div id="new-arrivals-container" className="max-w-7xl mx-auto container-padding">
          <div id="new-arrivals-header" className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            <h2 id="new-arrivals-title" className="heading-mobile font-serif font-bold text-elegant-900 mb-2 sm:mb-3 md:mb-4 section-title">
              Sản phẩm mới
            </h2>
            <p id="new-arrivals-subtitle" className="text-sm sm:text-base md:text-lg text-elegant-600 section-subtitle px-4">
              Những chai nước hoa mới nhất vừa được bổ sung vào bộ sưu tập
            </p>
          </div>
          
          {/* MOBILE-OPTIMIZED: Consistent grid with proper centering */}
          <div id="new-arrivals-grid" className="product-grid-mobile with-4-cols mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            {newProducts.map((product, index) => (
              <div key={product.id} id={`new-product-${index}`} className="product-card-enhanced">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {/* MOBILE-OPTIMIZED CTA BUTTON */}
          <div id="new-arrivals-cta" className="text-center px-4">
            <Link
              id="new-arrivals-link"
              to="/products?filter=new"
              className="btn-secondary inline-flex items-center justify-center space-x-2 touch-target hero-button w-full sm:w-auto max-w-sm mx-auto px-4 py-3 sm:px-6 sm:py-3"
            >
              <span className="text-sm sm:text-base">Xem tất cả sản phẩm mới</span>
              <ArrowRight size={16} className="sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - MOBILE OPTIMIZED */}
      <section id="testimonials-section" className="section-padding bg-elegant-50">
        <div id="testimonials-container" className="max-w-7xl mx-auto container-padding">
          <div id="testimonials-header" className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            <h2 id="testimonials-title" className="heading-mobile font-serif font-bold text-elegant-900 mb-2 sm:mb-3 md:mb-4 section-title">
              Khách hàng nói gì
            </h2>
            <p className="text-sm text-elegant-600 px-4 max-w-md mx-auto sm:hidden">
              Những đánh giá thật từ khách hàng của chúng tôi
            </p>
          </div>
          
          {/* MOBILE-FIRST LAYOUT */}
          <div className="sm:hidden">
            {/* Mobile: Single column with carousel-like feel */}
            <div className="space-y-4 px-2">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-elegant-100 mx-auto max-w-sm">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-elegant-700 mb-3 text-sm italic leading-relaxed text-center">
                  "Nước hoa chất lượng tuyệt vời, mùi hương rất lâu phai. Dịch vụ chuyên nghiệp."
                </p>
                <div className="text-center">
                  <div className="font-semibold text-elegant-900 text-sm">Nguyễn Thị Lan</div>
                  <div className="text-elegant-500 text-xs">Khách hàng VIP</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-elegant-100 mx-auto max-w-sm">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-elegant-700 mb-3 text-sm italic leading-relaxed text-center">
                  "Giao hàng nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ."
                </p>
                <div className="text-center">
                  <div className="font-semibold text-elegant-900 text-sm">Trần Văn Nam</div>
                  <div className="text-elegant-500 text-xs">Khách hàng thân thiết</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-elegant-100 mx-auto max-w-sm">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-elegant-700 mb-3 text-sm italic leading-relaxed text-center">
                  "Bộ sưu tập đa dạng, giá cả hợp lý. Rất hài lòng với trải nghiệm mua sắm."
                </p>
                <div className="text-center">
                  <div className="font-semibold text-elegant-900 text-sm">Lê Thị Hoa</div>
                  <div className="text-elegant-500 text-xs">Khách hàng mới</div>
                </div>
              </div>
            </div>
            
            {/* Mobile Summary Stats */}
            <div className="mt-6 pt-6 border-t border-elegant-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-600">500+</div>
                  <div className="text-xs text-elegant-600">Khách hàng</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600">4.9</div>
                  <div className="text-xs text-elegant-600">Đánh giá TB</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600">98%</div>
                  <div className="text-xs text-elegant-600">Hài lòng</div>
                </div>
              </div>
            </div>
          </div>

          {/* TABLET & DESKTOP LAYOUT */}
          <div className="hidden sm:block">
            <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div id="testimonial-1" className="card text-center testimonial-card bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-elegant-600 mb-4 text-base italic leading-relaxed">
                  "Nước hoa chất lượng tuyệt vời, mùi hương rất lâu phai. Dịch vụ chuyên nghiệp."
                </p>
                <div className="font-medium text-elegant-900 text-base">Nguyễn Thị Lan</div>
                <div className="text-elegant-500 text-sm">Khách hàng VIP</div>
              </div>
              
              <div id="testimonial-2" className="card text-center testimonial-card bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-elegant-600 mb-4 text-base italic leading-relaxed">
                  "Giao hàng nhanh, đóng gói cẩn thận. Sẽ tiếp tục ủng hộ."
                </p>
                <div className="font-medium text-elegant-900 text-base">Trần Văn Nam</div>
                <div className="text-elegant-500 text-sm">Khách hàng thân thiết</div>
              </div>
              
              <div id="testimonial-3" className="card text-center testimonial-card bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-elegant-600 mb-4 text-base italic leading-relaxed">
                  "Bộ sưu tập đa dạng, giá cả hợp lý. Rất hài lòng với trải nghiệm mua sắm."
                </p>
                <div className="font-medium text-elegant-900 text-base">Lê Thị Hoa</div>
                <div className="text-elegant-500 text-sm">Khách hàng mới</div>
              </div>
            </div>

            {/* Desktop Summary Stats */}
            <div className="mt-12 pt-8 border-t border-elegant-200">
              <div className="grid grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                  <div className="text-sm text-elegant-600">Khách hàng hài lòng</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">4.9/5</div>
                  <div className="text-sm text-elegant-600">Đánh giá trung bình</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
                  <div className="text-sm text-elegant-600">Tỷ lệ hài lòng</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                  <div className="text-sm text-elegant-600">Hỗ trợ khách hàng</div>
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

export default Home; 