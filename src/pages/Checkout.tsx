import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, MapPin, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { CheckoutState, CustomerInfo, ShippingMethod, PaymentMethod, PaymentInfo, OrderCreate } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrderSummary from '../components/OrderSummary';
import CustomerInfoForm from '../components/CustomerInfoForm';
import PaymentSection from '../components/PaymentSection';
import OrderConfirmation from '../components/OrderConfirmation';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { createOrder } = useOrder();
  
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    step: 'info',
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      district: '',
      ward: '',
      notes: ''
    },
    shippingMethod: {
      id: 'standard',
      name: 'Giao hàng tiêu chuẩn',
      description: 'Giao hàng trong 3-5 ngày làm việc',
      price: 30000,
      estimatedDays: '3-5 ngày',
      isSelected: true
    },
    isProcessing: false
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/products');
    }
  }, [items, navigate]);

  const steps = [
    { key: 'info', title: 'Thông tin', icon: MapPin },
    { key: 'payment', title: 'Thanh toán', icon: CreditCard },
    { key: 'confirmation', title: 'Xác nhận', icon: Check }
  ];

  const subtotal = getTotalPrice();
  const shipping = checkoutState.shippingMethod.price;
  const tax = Math.round(subtotal * 0.1); // 10% VAT
  const total = subtotal + shipping + tax;

  const handleStepComplete = (step: string, data?: CustomerInfo | PaymentInfo) => {
    switch (step) {
      case 'info':
        setCheckoutState(prev => ({
          ...prev,
          step: 'payment',
          customerInfo: data as CustomerInfo
        }));
        break;
      case 'payment':
        setCheckoutState(prev => ({
          ...prev,
          step: 'confirmation',
          paymentInfo: data as PaymentInfo
        }));
        break;
      case 'confirmation':
        // Handle order completion
        handleOrderComplete();
        break;
    }
  };

  const handleOrderComplete = async () => {
    setCheckoutState(prev => ({ ...prev, isProcessing: true }));
    
    try {
      // Tạo đơn hàng thực sự bằng OrderContext
      const orderData: OrderCreate = {
        customerInfo: checkoutState.customerInfo,
        items: items,
        shippingMethod: checkoutState.shippingMethod,
        paymentMethod: checkoutState.paymentInfo!.method,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total,
        notes: checkoutState.customerInfo.notes
      };

      // Gọi API tạo đơn hàng (hiện tại vẫn là simulation)
      const newOrder = await createOrder(orderData);
      
      // Clear cart sau khi tạo đơn hàng thành công
      clearCart();
      
      // Log để debug
      console.log('Order created successfully:', newOrder);
      
      // Có thể redirect đến trang success hoặc order tracking
      // navigate(`/order-success/${newOrder.id}`);
      
    } catch (error) {
      console.error('Error creating order:', error);
      // Hiển thị error cho user
    } finally {
      setCheckoutState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === checkoutState.step);
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Thanh toán</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => {
              const isActive = step.key === checkoutState.step;
              const isCompleted = getCurrentStepIndex() > index;
              const StepIcon = step.icon;
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 
                    ${isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}>
                    <StepIcon className="w-6 h-6" />
                  </div>
                  
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      Bước {index + 1}
                    </p>
                    <p className={`text-xs ${
                      isActive || isCompleted ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`
                      w-16 h-0.5 mx-6
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {checkoutState.step === 'info' && (
              <CustomerInfoForm 
                customerInfo={checkoutState.customerInfo}
                onComplete={(data) => handleStepComplete('info', data)}
              />
            )}
            
            {checkoutState.step === 'payment' && (
              <PaymentSection 
                total={total}
                onComplete={(data) => handleStepComplete('payment', data)}
                onBack={() => setCheckoutState(prev => ({ ...prev, step: 'info' }))}
              />
            )}
            
            {checkoutState.step === 'confirmation' && (
              <OrderConfirmation 
                checkoutState={checkoutState}
                total={total}
                items={items}
                onComplete={() => handleStepComplete('confirmation')}
                onBack={() => setCheckoutState(prev => ({ ...prev, step: 'payment' }))}
                isProcessing={checkoutState.isProcessing}
              />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary 
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              shippingMethod={checkoutState.shippingMethod}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout; 