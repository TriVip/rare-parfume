import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency, calculateDiscount } from '../utils';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discountPercentage = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  if (viewMode === 'list') {
    return (
      <div id={`product-card-list-${product.id}`} className="product-card bg-white rounded-lg shadow-sm border border-elegant-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
        <Link to={`/products/${product.id}`} id={`product-link-list-${product.id}`} className="flex flex-col sm:flex-row">
          {/* Product Image - OPTIMIZED HEIGHT FOR MOBILE */}
          <div id={`product-image-container-list-${product.id}`} className="relative w-full sm:w-40 md:w-48 h-40 sm:h-32 md:h-48 bg-elegant-100 flex-shrink-0">
            <img
              id={`product-image-list-${product.id}`}
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Badges - SMALLER ON MOBILE */}
            <div id={`product-badges-list-${product.id}`} className="absolute top-2 left-2 flex flex-col space-y-1">
              {product.isNew && (
                <span id={`product-new-badge-list-${product.id}`} className="bg-primary-600 text-white px-2 py-1 text-xs font-medium rounded">
                  Mới
                </span>
              )}
              {discountPercentage > 0 && (
                <span id={`product-discount-badge-list-${product.id}`} className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                  -{discountPercentage}%
                </span>
              )}
              {!product.inStock && (
                <span id={`product-stock-badge-list-${product.id}`} className="bg-gray-500 text-white px-2 py-1 text-xs font-medium rounded">
                  Hết hàng
                </span>
              )}
            </div>
          </div>

          {/* Product Info - IMPROVED MOBILE SPACING */}
          <div id={`product-info-list-${product.id}`} className="flex-1 p-3 sm:p-4 md:p-6">
            <div id={`product-content-list-${product.id}`} className="flex flex-col space-y-2 sm:space-y-3 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
              <div id={`product-details-list-${product.id}`} className="flex-1">
                {/* Brand */}
                <p id={`product-brand-list-${product.id}`} className="text-xs sm:text-sm text-elegant-500 mb-1">{product.brand}</p>
                
                {/* Product Name - RESPONSIVE TEXT SIZE */}
                <h3 id={`product-name-list-${product.id}`} className="text-base sm:text-lg md:text-xl font-semibold text-elegant-900 mb-2 hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                  {product.name}
                </h3>

                {/* Category and Volume - MOBILE OPTIMIZED */}
                <div id={`product-meta-list-${product.id}`} className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0 text-xs sm:text-sm text-elegant-500 mb-2">
                  <span id={`product-category-list-${product.id}`}>{product.category}</span>
                  <span id={`product-volume-list-${product.id}`}>{product.volume}</span>
                  <span id={`product-origin-list-${product.id}`} className="hidden md:inline">{product.origin}</span>
                </div>

                {/* Description - HIDDEN ON SMALL MOBILE */}
                <p id={`product-description-list-${product.id}`} className="text-elegant-600 mb-3 line-clamp-2 text-sm hidden sm:block">
                  {product.description}
                </p>

                {/* Rating - COMPACT ON MOBILE */}
                <div id={`product-rating-list-${product.id}`} className="flex items-center space-x-1 mb-3">
                  <div id={`product-stars-list-${product.id}`} className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        id={`product-star-${i}-list-${product.id}`}
                        size={12}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-elegant-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span id={`product-rating-text-list-${product.id}`} className="text-xs text-elegant-600">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                {/* Notes preview - Hidden on mobile */}
                <div id={`product-notes-list-${product.id}`} className="mb-4 hidden lg:block">
                  <p id={`product-notes-text-list-${product.id}`} className="text-sm text-elegant-600">
                    <span className="font-medium">Hương đầu:</span> {product.notes.top.slice(0, 3).join(', ')}
                    {product.notes.top.length > 3 && '...'}
                  </p>
                </div>
              </div>

              {/* MOBILE-FIRST PRICE AND ACTION LAYOUT */}
              <div id={`product-actions-list-${product.id}`} className="flex flex-row justify-between items-center sm:flex-col sm:ml-4 md:ml-6 sm:items-end sm:space-y-3">
                {/* Price - RESPONSIVE SIZING */}
                <div id={`product-price-container-list-${product.id}`} className="text-left sm:text-right">
                  <div id={`product-price-list-${product.id}`} className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600">
                    {formatCurrency(product.price)}
                  </div>
                  {product.originalPrice && (
                    <div id={`product-original-price-list-${product.id}`} className="text-xs sm:text-sm text-elegant-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </div>
                  )}
                </div>

                {/* Add to Cart - IMPROVED MOBILE BUTTON */}
                <button
                  id={`product-add-cart-list-${product.id}`}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="btn-primary flex items-center space-x-1 sm:space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 touch-target"
                >
                  <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                  <span className="whitespace-nowrap">{product.inStock ? 'Thêm' : 'Hết'}</span>
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div id={`product-card-grid-${product.id}`} className="product-card-mobile-optimized group">
      <Link to={`/products/${product.id}`} id={`product-link-grid-${product.id}`} className="block">
        {/* Product Image - MOBILE OPTIMIZED WITH PROPER ASPECT RATIO */}
        <div id={`product-image-container-grid-${product.id}`} className="product-image-responsive">
          <div className="product-image-aspect">
            <img
              id={`product-image-grid-${product.id}`}
              src={product.images[0]}
              alt={product.name}
              className="product-image-content transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Badges - RESPONSIVE SIZING */}
            <div id={`product-badges-grid-${product.id}`} className="absolute top-2 left-2 flex flex-col space-y-1 z-10">
              {product.isNew && (
                <span id={`product-new-badge-grid-${product.id}`} className="bg-primary-600 text-white px-2 py-1 text-xs font-medium rounded">
                  Mới
                </span>
              )}
              {discountPercentage > 0 && (
                <span id={`product-discount-badge-grid-${product.id}`} className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                  -{discountPercentage}%
                </span>
              )}
              {!product.inStock && (
                <span id={`product-stock-badge-grid-${product.id}`} className="bg-gray-500 text-white px-2 py-1 text-xs font-medium rounded">
                  Hết hàng
                </span>
              )}
            </div>

            {/* Quick Add to Cart - ALWAYS VISIBLE ON MOBILE */}
            <div id={`product-quick-cart-grid-${product.id}`} className="absolute bottom-2 left-2 right-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button
                id={`product-quick-add-grid-${product.id}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm py-2 px-3 touch-target"
              >
                <ShoppingCart size={14} />
                <span>{product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Info - COMPACT MOBILE LAYOUT */}
        <div id={`product-info-grid-${product.id}`} className="p-3 sm:p-4 flex-1 flex flex-col">
          {/* Brand */}
          <p id={`product-brand-grid-${product.id}`} className="text-xs sm:text-sm text-elegant-500 mb-1">{product.brand}</p>
          
          {/* Product Name - RESPONSIVE HEIGHT */}
          <h3 id={`product-name-grid-${product.id}`} className="text-sm sm:text-base md:text-lg font-semibold text-elegant-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200 flex-grow min-h-[2.5rem] sm:min-h-[3rem]">
            {product.name}
          </h3>

          {/* Category and Volume - MOBILE OPTIMIZED */}
          <div id={`product-meta-grid-${product.id}`} className="flex flex-col sm:flex-row sm:justify-between text-xs text-elegant-500 mb-2 space-y-1 sm:space-y-0">
            <span id={`product-category-grid-${product.id}`}>{product.category}</span>
            <span id={`product-volume-grid-${product.id}`}>{product.volume}</span>
          </div>

          {/* Rating - COMPACT */}
          <div id={`product-rating-grid-${product.id}`} className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <div id={`product-stars-grid-${product.id}`} className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    id={`product-star-${i}-grid-${product.id}`}
                    size={12}
                    className={`${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-elegant-300'
                    }`}
                  />
                ))}
              </div>
              <span id={`product-rating-text-grid-${product.id}`} className="text-xs text-elegant-600">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-elegant-500">({product.reviewCount})</span>
          </div>

          {/* Price - RESPONSIVE LAYOUT */}
          <div id={`product-price-container-grid-${product.id}`} className="mt-auto">
            <div id={`product-price-grid-${product.id}`} className="text-base sm:text-lg md:text-xl font-bold text-primary-600">
              {formatCurrency(product.price)}
            </div>
            {product.originalPrice && (
              <div id={`product-original-price-grid-${product.id}`} className="text-xs sm:text-sm text-elegant-400 line-through">
                {formatCurrency(product.originalPrice)}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 