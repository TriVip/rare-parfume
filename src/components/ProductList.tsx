import React, { useEffect, useState } from 'react';
import cmsService from '../services/cmsService';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await cmsService.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.length === 0 ? (
        <div className="col-span-full text-center p-8">Không có sản phẩm nào</div>
      ) : (
        products.map((product) => (
          <div 
            key={product.id} 
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {product.images && product.images.length > 0 && (
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 line-clamp-2 mt-1">{product.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="font-bold text-lg">
                  {new Intl.NumberFormat('vi-VN', { 
                    style: 'currency', 
                    currency: 'VND' 
                  }).format(product.price)}
                </span>
                <span className={`px-2 py-1 rounded text-sm ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList; 