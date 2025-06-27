import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Truck, Shield, ArrowLeft, Plus, Minus, Check, AlertCircle, Zap, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { mockProducts, mockReviews } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Product, VolumeOption } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState<VolumeOption | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === id);
    setProduct(foundProduct || null);
    
    // Set default volume selection
    if (foundProduct?.volumes?.length) {
      const defaultVolume = foundProduct.volumes.find(v => v.inStock) || foundProduct.volumes[0];
      setSelectedVolume(defaultVolume);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto container-padding py-16 text-center">
          <h1 className="text-2xl font-bold text-elegant-900 mb-4">Không tìm thấy sản phẩm</h1>
          <Link to="/products" className="btn-primary">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = mockProducts.filter(p => 
    p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const productReviews = mockReviews.filter(r => r.productId === product.id);

  const currentPrice = selectedVolume?.price || product.price;
  const currentOriginalPrice = selectedVolume?.originalPrice || product.originalPrice;
  const currentStock = selectedVolume?.stockQuantity || (product.inStock ? 10 : 0);
  const isInStock = selectedVolume?.inStock !== undefined ? selectedVolume.inStock : product.inStock;

  const handleAddToCart = () => {
    if (!isInStock) return;
    
    // Create a modified product with selected volume
    const productToAdd = {
      ...product,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      volume: selectedVolume?.size || product.volume
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
  };

  const handleBuyNow = () => {
    if (!isInStock) return;
    
    // Add to cart first
    handleAddToCart();
    
    // Navigate to checkout page
    navigate('/checkout');
  };

  const getStockStatus = () => {
    if (!isInStock) return { text: 'Hết hàng', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (currentStock <= 3) return { text: `Chỉ còn ${currentStock} sản phẩm`, color: 'text-orange-600', bgColor: 'bg-orange-100' };
    if (currentStock <= 10) return { text: 'Còn ít hàng', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { text: 'Còn hàng', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto container-padding section-padding">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-elegant-600 mb-4 sm:mb-8">
          <Link to="/" className="hover:text-primary-600">Trang chủ</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-600">Sản phẩm</Link>
          <span>/</span>
          <span className="text-elegant-900 line-clamp-1">{product.name}</span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-elegant-600 hover:text-primary-600 mb-6 sm:mb-8 transition-colors touch-target"
        >
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          {/* Product Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square bg-elegant-100 rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors touch-target ${
                    selectedImageIndex === index
                      ? 'border-primary-500'
                      : 'border-elegant-200 hover:border-elegant-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-sm sm:text-base text-elegant-600 font-medium mb-2">{product.brand}</p>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-elegant-900 leading-tight mb-3 sm:mb-4">
                  {product.name}
                </h1>
              </div>
              
              {/* Rating - MOBILE FRIENDLY */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-elegant-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-elegant-900">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-elegant-600">
                  ({product.reviewCount} đánh giá)
                </span>
              </div>

              {/* Stock Status - MOBILE OPTIMIZED */}
              <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${stockStatus.bgColor} ${stockStatus.color} shadow-sm`}>
                {isInStock ? <Check size={14} /> : <AlertCircle size={14} />}
                <span>{stockStatus.text}</span>
              </div>
            </div>

            {/* Volume Options - MOBILE OPTIMIZED */}
            {product.volumes && product.volumes.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-elegant-900 mb-3 sm:mb-4">Dung tích</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-2">
                  {product.volumes.map((volume) => (
                    <button
                      key={volume.size}
                      onClick={() => setSelectedVolume(volume)}
                      disabled={!volume.inStock}
                      className={`p-3 sm:p-4 border border-elegant-200 rounded-lg text-center transition-all touch-target relative ${
                        selectedVolume?.size === volume.size
                          ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500/20'
                          : volume.inStock
                          ? 'hover:border-primary-300 hover:bg-primary-25'
                          : 'bg-elegant-50 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="flex flex-col space-y-1">
                        <div className="font-semibold text-elegant-900 text-sm sm:text-base">{volume.size}</div>
                        <div className="text-sm sm:text-base text-primary-600 font-semibold">
                          {volume.price.toLocaleString('vi-VN')}₫
                        </div>
                        {volume.originalPrice && (
                          <div className="text-xs sm:text-sm text-elegant-500 line-through">
                            {volume.originalPrice.toLocaleString('vi-VN')}₫
                          </div>
                        )}
                        {!volume.inStock && (
                          <div className="text-xs text-red-500 font-medium">Hết hàng</div>
                        )}
                        {/* Selected indicator */}
                        {selectedVolume?.size === volume.size && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price - MOBILE OPTIMIZED */}
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline space-y-1 sm:space-y-0 sm:space-x-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600">
                  {currentPrice.toLocaleString('vi-VN')}₫
                </span>
                {currentOriginalPrice && (
                  <span className="text-base sm:text-lg lg:text-xl text-elegant-500 line-through">
                    {currentOriginalPrice.toLocaleString('vi-VN')}₫
                  </span>
                )}
              </div>
              {currentOriginalPrice && (
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 text-green-800 text-xs sm:text-sm font-semibold px-2 py-1 rounded-full">
                    -{((currentOriginalPrice - currentPrice) / currentOriginalPrice * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs sm:text-sm text-green-600 font-medium">
                    Tiết kiệm {(currentOriginalPrice - currentPrice).toLocaleString('vi-VN')}₫
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector - MOBILE OPTIMIZED */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-elegant-900 mb-2 sm:mb-3">
                Số lượng
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-elegant-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-elegant-100 transition-colors touch-target"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="w-16 sm:w-20 h-10 sm:h-12 flex items-center justify-center bg-elegant-50 border-x border-elegant-300">
                    <span className="font-semibold text-sm sm:text-base">{quantity}</span>
                  </div>
                  <button
                    onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                    disabled={quantity >= currentStock}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-elegant-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-elegant-600">
                  Còn lại: <span className="font-medium text-elegant-900">{currentStock}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons - MOBILE OPTIMIZED */}
            <div className="space-y-3 sm:space-y-4">
              {/* Primary Action Buttons - Stack on mobile, row on desktop */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Buy Now Button - Primary */}
                <button
                  onClick={handleBuyNow}
                  disabled={!isInStock}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 sm:py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md touch-target text-sm sm:text-base"
                >
                  <Zap size={18} className="sm:w-5 sm:h-5" />
                  <span>{isInStock ? 'Mua ngay' : 'Hết hàng'}</span>
                </button>
                
                {/* Add to Cart Button - Secondary */}
                <button
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 sm:py-4 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-target text-sm sm:text-base"
                >
                  <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
                  <span>{isInStock ? 'Thêm vào giỏ' : 'Hết hàng'}</span>
                </button>
              </div>

              {/* Order Summary - MOBILE FRIENDLY */}
              <div className="bg-elegant-50 rounded-xl p-4 border border-elegant-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-elegant-600">
                    Số lượng: <span className="font-medium text-elegant-900">{quantity}</span>
                  </div>
                  <div className="text-sm text-elegant-600">
                    Đơn giá: <span className="font-medium text-primary-600">{currentPrice.toLocaleString('vi-VN')}₫</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-elegant-200">
                  <div className="text-base sm:text-lg font-semibold text-elegant-900">
                    Tổng cộng:
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-primary-600">
                    {(currentPrice * quantity).toLocaleString('vi-VN')}₫
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators - MOBILE OPTIMIZED */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-elegant-200">
              <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-elegant-100">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Truck className="text-primary-600" size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-semibold text-elegant-900 mb-1">Miễn phí vận chuyển</p>
                  <p className="text-xs sm:text-sm text-elegant-600 leading-relaxed">Cho đơn hàng trên 5 triệu</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-elegant-100">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Shield className="text-primary-600" size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-semibold text-elegant-900 mb-1">Hàng chính hãng</p>
                  <p className="text-xs sm:text-sm text-elegant-600 leading-relaxed">100% authentic</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-elegant-900 mb-4">
                Mô tả sản phẩm
              </h2>
              <div className="prose prose-elegant max-w-none">
                <p className="text-elegant-700 leading-relaxed text-sm sm:text-base">
                  {showFullDescription ? product.description : product.description.slice(0, 200) + '...'}
                </p>
                {product.description.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-primary-600 hover:text-primary-700 font-medium mt-2 touch-target"
                  >
                    {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                  </button>
                )}
              </div>
            </div>

            {/* Fragrance Notes */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-elegant-900 mb-4">
                Thành phần hương thơm
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-elegant-900 mb-2 text-sm sm:text-base">Hương đầu (Top Notes)</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.top.map((note, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs sm:text-sm"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-elegant-900 mb-2 text-sm sm:text-base">Hương giữa (Middle Notes)</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.middle.map((note, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-xs sm:text-sm"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-elegant-900 mb-2 text-sm sm:text-base">Hương cuối (Base Notes)</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.base.map((note, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-elegant-200 text-elegant-800 rounded-full text-xs sm:text-sm"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {productReviews.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-elegant-900 mb-4">
                  Đánh giá từ khách hàng
                </h2>
                <div className="space-y-4">
                  {productReviews.map((review) => (
                    <div key={review.id} className="border border-elegant-200 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-elegant-900 text-sm sm:text-base">{review.userName}</span>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Đã xác minh
                            </span>
                          )}
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={`${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-elegant-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-elegant-700 text-xs sm:text-sm">{review.comment}</p>
                      <p className="text-xs text-elegant-500 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-elegant-50 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-elegant-900 mb-4 text-base sm:text-lg">Thông tin sản phẩm</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-elegant-600">Thương hiệu:</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elegant-600">Danh mục:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elegant-600">Dung tích:</span>
                  <span className="font-medium">{selectedVolume?.size || product.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elegant-600">Xuất xứ:</span>
                  <span className="font-medium">{product.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elegant-600">Đánh giá:</span>
                  <span className="font-medium">{product.rating}/5 ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-elegant-600">Số đánh giá:</span>
                  <span className="font-medium">{product.reviewCount}</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="bg-elegant-50 rounded-xl p-4 sm:p-6">
                <h3 className="font-semibold text-elegant-900 mb-4 text-base sm:text-lg">Thành phần chính</h3>
                <div className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="text-sm text-elegant-700">
                      • {ingredient}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products - MOBILE HORIZONTAL SCROLL */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section bg-gradient-to-br from-elegant-50 to-primary-50/30 rounded-2xl p-4 sm:p-6 lg:p-10 mb-12 sm:mb-16 border border-elegant-200/50">
            {/* Header Section - ENHANCED */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8 lg:mb-10">
              <div className="mb-4 sm:mb-0">
                {/* Main Title with Gradient */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-1 h-8 sm:h-10 bg-gradient-to-b from-primary-600 to-gold-600 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold bg-gradient-to-r from-elegant-900 to-elegant-700 bg-clip-text text-transparent">
                    Sản phẩm liên quan
                  </h2>
                </div>
                
                {/* Subtitle with Stats */}
                <div className="space-y-1">
                  <p className="text-sm sm:text-base text-elegant-600 max-w-md leading-relaxed">
                    Những sản phẩm cùng danh mục <span className="font-medium text-primary-600">{product.category}</span> có thể bạn quan tâm
                  </p>
                  
                  {/* Mobile Stats */}
                  <div className="flex items-center space-x-4 text-xs sm:text-sm text-elegant-500 sm:hidden">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>{relatedProducts.length} sản phẩm</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{relatedProducts.filter(p => p.inStock).length} còn hàng</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={8} className="text-yellow-400 fill-current" />
                      <span>{Math.round(relatedProducts.reduce((acc, p) => acc + p.rating, 0) / relatedProducts.length * 10) / 10}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* View All Button - ENHANCED DESKTOP */}
              <div className="hidden sm:block">
                <div className="text-right space-y-2">
                  {/* Stats Row */}
                  <div className="flex items-center justify-end space-x-4 text-xs text-elegant-500 mb-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                      <span>{relatedProducts.length} sản phẩm</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{relatedProducts.filter(p => p.inStock).length} còn hàng</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={10} className="text-yellow-400 fill-current" />
                      <span>{Math.round(relatedProducts.reduce((acc, p) => acc + p.rating, 0) / relatedProducts.length * 10) / 10}</span>
                    </div>
                  </div>
                  
                  {/* Enhanced CTA Button */}
                  <Link
                    to={`/products?category=${encodeURIComponent(product.category)}`}
                    className="related-cta-button inline-flex items-center space-x-2 bg-white hover:bg-primary-50 text-primary-600 hover:text-primary-700 font-semibold text-sm lg:text-base transition-all duration-300 px-4 py-2 rounded-xl border border-primary-200 hover:border-primary-300 shadow-sm hover:shadow-md group"
                  >
                    <span>Xem tất cả {product.category}</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* MOBILE: Enhanced Horizontal Scroll Layout */}
            <div className="sm:hidden relative z-10">
              <div className="flex space-x-4 overflow-x-auto pb-4 px-1 scrollbar-hide related-products-mobile-scroll">
                {relatedProducts.map((relatedProduct, index) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/products/${relatedProduct.id}`}
                    className="flex-shrink-0 w-40 group related-products-mobile-card"
                  >
                    <div className="bg-white rounded-2xl shadow-md border border-elegant-200 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                      {/* Product Image */}
                      <div className="aspect-square bg-elegant-100 overflow-hidden relative">
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Price Badge */}
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                          <div className="text-xs font-bold text-primary-600">
                            {Math.round(relatedProduct.price / 1000)}k
                          </div>
                        </div>
                      </div>
                      
                      {/* Product Info - Enhanced */}
                      <div className="p-3">
                        {/* Product Name */}
                        <h3 className="text-sm font-semibold text-elegant-900 line-clamp-2 leading-tight mb-2 group-hover:text-primary-600 transition-colors min-h-[2.5rem]">
                          {relatedProduct.name}
                        </h3>
                        
                        {/* Price Section - Single Price Only */}
                        <div className="mb-2">
                          <div className="text-base font-bold text-primary-600">
                            {relatedProduct.price.toLocaleString('vi-VN')}₫
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mt-2 space-x-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={10}
                                className={`${
                                  i < Math.floor(relatedProduct.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-elegant-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-elegant-600 font-medium">
                            {relatedProduct.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {/* Enhanced View More Card */}
                <Link
                  to={`/products?category=${encodeURIComponent(product.category)}`}
                  className="flex-shrink-0 w-40 group related-products-mobile-card"
                >
                  <div className="view-more-card bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-md border-2 border-primary-200 border-dashed overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full">
                    <div className="aspect-square flex items-center justify-center relative">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center mb-2 mx-auto group-hover:bg-white transition-colors">
                          <ArrowRight className="text-primary-600 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                        </div>
                        <div className="text-sm font-semibold text-primary-700">Xem thêm</div>
                        <div className="text-xs text-primary-600 mt-1">{product.category}</div>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-3 right-3 w-2 h-2 bg-primary-300 rounded-full opacity-60"></div>
                      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-primary-400 rounded-full opacity-40"></div>
                    </div>
                    <div className="p-3">
                      <div className="text-xs text-primary-600 text-center font-medium">
                        {relatedProducts.length}+ sản phẩm
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Enhanced Scroll Indicator */}
              <div className="text-center mt-3">
                <div className="inline-flex items-center space-x-2 text-xs text-elegant-500 scroll-indicator bg-elegant-100 px-3 py-1 rounded-full">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-elegant-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-elegant-300 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1 h-1 bg-elegant-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <span>Vuốt để xem thêm</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-elegant-300 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                    <div className="w-1 h-1 bg-elegant-300 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                    <div className="w-1 h-1 bg-elegant-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
              </div>

              {/* Mobile View All Button */}
              <div className="mt-4 text-center">
                <Link
                  to={`/products?category=${encodeURIComponent(product.category)}`}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold text-sm transition-all duration-300 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 group"
                >
                  <span>Xem tất cả {product.category}</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* DESKTOP: Grid Layout (unchanged) */}
            <div className="hidden sm:block relative z-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
                {relatedProducts.map((relatedProduct, index) => (
                  <div 
                    key={relatedProduct.id} 
                    className="related-products-card related-product-wrapper"
                  >
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-elegant-100">
                      <ProductCard product={relatedProduct} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Section - DESKTOP ONLY */}
              <div className="hidden lg:block mt-8 pt-6 border-t border-elegant-200">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary-600">{relatedProducts.length}</div>
                    <div className="text-xs text-elegant-600">Sản phẩm liên quan</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary-600">
                      {Math.round(relatedProducts.reduce((acc, p) => acc + p.rating, 0) / relatedProducts.length * 10) / 10}
                    </div>
                    <div className="text-xs text-elegant-600">Đánh giá trung bình</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary-600">
                      {relatedProducts.filter(p => p.inStock).length}
                    </div>
                    <div className="text-xs text-elegant-600">Còn hàng</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Empty State for Related Products - WHEN NO PRODUCTS FOUND */}
        {relatedProducts.length === 0 && (
          <section className="bg-elegant-50 rounded-2xl p-8 sm:p-12 text-center mb-12 sm:mb-16 border border-elegant-200">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-elegant-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <ShoppingBag className="text-elegant-500" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-elegant-900 mb-2 sm:mb-3">
                Chưa có sản phẩm liên quan
              </h3>
              <p className="text-sm sm:text-base text-elegant-600 mb-6 sm:mb-8">
                Hiện tại chưa có sản phẩm cùng danh mục. Hãy khám phá các sản phẩm khác của chúng tôi.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 touch-target"
              >
                <span>Khám phá sản phẩm</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail; 