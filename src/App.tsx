import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { SupabaseProvider } from './context/SupabaseContext';
import Cart from './components/Cart';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import DatabaseSetup from './pages/DatabaseSetup';
import ProtectedRoute from './components/ProtectedRoute';
import SupabaseTest from './components/SupabaseTest';

// Import Login component
import Login from './components/Login';

function App() {
  return (
    <SupabaseProvider>
      <CartProvider>
        <OrderProvider>
          <Router>
            <div id="app-root" className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<div id="about-page" className="min-h-screen p-8"><h1 id="about-title">About Page</h1></div>} />
                <Route path="/supabase-test" element={<SupabaseTest />} />
                <Route path="/database-setup" element={<DatabaseSetup />} />
              </Routes>
              <Cart />
            </div>
          </Router>
        </OrderProvider>
      </CartProvider>
    </SupabaseProvider>
  );
}

export default App;
