import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice,
    getTotalItems 
  } = useCart();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div id="cart-overlay" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        id="cart-backdrop"
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeCart}
      ></div>
      
      {/* Cart panel */}
      <div id="cart-panel" className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
        <div id="cart-content" className="flex flex-col h-full">
          {/* Header */}
          <div id="cart-header" className="flex items-center justify-between p-4 border-b border-elegant-200">
            <h2 id="cart-title" className="text-lg font-semibold text-elegant-900 flex items-center space-x-2">
              <ShoppingBag size={20} />
              <span id="cart-title-text">Giỏ hàng ({getTotalItems()})</span>
            </h2>
            <button
              id="cart-close-button"
              onClick={closeCart}
              className="p-2 hover:bg-elegant-100 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart items */}
          <div id="cart-items-container" className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div id="cart-empty-state" className="text-center py-12">
                <ShoppingBag id="cart-empty-icon" size={48} className="mx-auto text-elegant-300 mb-4" />
                <p id="cart-empty-message" className="text-elegant-500 mb-4">Giỏ hàng của bạn đang trống</p>
                <button
                  id="cart-continue-shopping"
                  onClick={closeCart}
                  className="btn-primary"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              <div id="cart-items-list" className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} id={`cart-item-${item.product.id}`} className="flex items-center space-x-4 p-4 bg-elegant-50 rounded-lg">
                    {/* Product image */}
                    <img
                      id={`cart-item-image-${item.product.id}`}
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    {/* Product info */}
                    <div id={`cart-item-info-${item.product.id}`} className="flex-1 min-w-0">
                      <h3 id={`cart-item-name-${item.product.id}`} className="text-sm font-medium text-elegant-900 truncate">
                        {item.product.name}
                      </h3>
                      <p id={`cart-item-brand-${item.product.id}`} className="text-xs text-elegant-500">{item.product.brand}</p>
                      <p id={`cart-item-price-${item.product.id}`} className="text-sm font-semibold text-primary-600">
                        {formatCurrency(item.product.price)}
                      </p>
                    </div>
                    
                    {/* Quantity controls */}
                    <div id={`cart-item-quantity-${item.product.id}`} className="flex items-center space-x-2">
                      <button
                        id={`cart-item-decrease-${item.product.id}`}
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-elegant-200 rounded transition-colors duration-200"
                      >
                        <Minus size={14} />
                      </button>
                      <span id={`cart-item-quantity-text-${item.product.id}`} className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        id={`cart-item-increase-${item.product.id}`}
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-elegant-200 rounded transition-colors duration-200"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    {/* Remove button */}
                    <button
                      id={`cart-item-remove-${item.product.id}`}
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div id="cart-footer" className="border-t border-elegant-200 p-4 space-y-4">
              {/* Total */}
              <div id="cart-total" className="flex justify-between items-center">
                <span id="cart-total-label" className="text-lg font-semibold text-elegant-900">Tổng cộng:</span>
                <span id="cart-total-amount" className="text-xl font-bold text-primary-600">
                  {formatCurrency(getTotalPrice())}
                </span>
              </div>
              
              {/* Actions */}
              <div id="cart-actions" className="space-y-2">
                <button
                  id="cart-checkout-button"
                  onClick={handleCheckout}
                  className="w-full btn-primary"
                >
                  Thanh toán
                </button>
                <button
                  id="cart-continue-button"
                  onClick={closeCart}
                  className="w-full btn-secondary"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
              
              {/* Free shipping notice */}
              {getTotalPrice() < 2000000 && (
                <div id="cart-shipping-notice" className="text-center p-3 bg-gold-50 rounded-lg">
                  <p id="cart-shipping-text" className="text-sm text-gold-700">
                    Thêm {formatCurrency(2000000 - getTotalPrice())} để được <strong>miễn phí vận chuyển</strong>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 