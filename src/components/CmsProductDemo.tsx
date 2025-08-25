import React, { useEffect, useState } from 'react';
import cmsService from '../services/cmsService';
import { Product } from '../types';

const CmsProductDemo: React.FC = () => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await cmsService.getProducts();
        console.log('Raw data from CMS:', data);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Không thể tải dữ liệu từ CMS');
        console.error('Error fetching products from CMS:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">CMS Connection Demo</h2>
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">CMS Connection Demo</h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
          <p className="text-sm text-red-600 mt-2">
            Vui lòng kiểm tra kết nối đến CMS tại: {process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000'}
          </p>
        </div>
      </div>
    );
  }

  // Kiểm tra cấu trúc dữ liệu
  const isValidArray = Array.isArray(products);
  const productsArray = isValidArray ? products : [];
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">CMS Connection Demo</h2>
      
      {!products ? (
        <p className="text-gray-500">Không có dữ liệu từ CMS</p>
      ) : !isValidArray ? (
        <div>
          <p className="text-amber-600 mb-4">⚠️ Dữ liệu không phải là mảng! Kiểm tra console để biết thêm chi tiết.</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-medium mb-2">Cấu trúc dữ liệu nhận được:</h3>
            <pre className="text-xs overflow-auto max-h-40">
              {JSON.stringify(products, null, 2)}
            </pre>
          </div>
        </div>
      ) : productsArray.length === 0 ? (
        <p className="text-gray-500">Mảng sản phẩm trống</p>
      ) : (
        <div>
          <p className="text-green-600 mb-4">✅ Kết nối CMS thành công! Đã tải {productsArray.length} sản phẩm.</p>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Danh sách sản phẩm:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {productsArray.slice(0, 5).map((product: any, index: number) => (
                <li key={product?.id || index}>
                  {product?.name || 'Không có tên'} - 
                  {product?.price ? new Intl.NumberFormat('vi-VN', { 
                    style: 'currency', 
                    currency: 'VND' 
                  }).format(product.price) : 'Không có giá'}
                </li>
              ))}
              {productsArray.length > 5 && (
                <li className="text-gray-500">...và {productsArray.length - 5} sản phẩm khác</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CmsProductDemo; 