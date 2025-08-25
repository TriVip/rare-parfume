import React from 'react';
import ProductList from '../components/products/ProductList';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sản phẩm nổi bật</h1>
      
      {/* This component will fetch featured products from the CMS backend */}
      <ProductList featured={true} />
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Tất cả sản phẩm</h2>
        
        {/* This component will fetch all products from the CMS backend */}
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
