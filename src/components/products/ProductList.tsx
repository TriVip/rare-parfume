import React, { useEffect, useState } from 'react';
import { Product, productService } from '../../services/productService';

interface ProductListProps {
  category?: string;
  featured?: boolean;
  searchQuery?: string;
}

const ProductList: React.FC<ProductListProps> = ({ 
  category, 
  featured = false,
  searchQuery 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let fetchedProducts: Product[];

        if (searchQuery) {
          fetchedProducts = await productService.searchProducts(searchQuery);
        } else if (category) {
          fetchedProducts = await productService.getProductsByCategory(category);
        } else if (featured) {
          fetchedProducts = await productService.getFeaturedProducts();
        } else {
          fetchedProducts = await productService.getAllProducts();
        }

        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải sản phẩm');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, featured, searchQuery]);

  if (loading) {
    return <div className="flex justify-center p-8">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="p-4">Không tìm thấy sản phẩm nào.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-square overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-lg">{product.name}</h3>
            <p className="text-gray-500 mt-1 text-sm line-clamp-2">{product.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
              <button className="bg-black text-white px-3 py-1 rounded text-sm">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
