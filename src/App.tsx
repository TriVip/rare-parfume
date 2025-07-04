import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Cart from './components/Cart';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';

// Placeholder components for other pages
const Login = () => <div id="login-page" className="min-h-screen p-8"><h1 id="login-title">Login Page</h1></div>;

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <Router>
          <div id="app-root" className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<div id="about-page" className="min-h-screen p-8"><h1 id="about-title">About Page</h1></div>} />
            </Routes>
            <Cart />
          </div>
        </Router>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
