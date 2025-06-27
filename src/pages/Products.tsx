import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, SlidersHorizontal, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter states
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    brands: [] as string[],
    priceRange: [0, 10000000] as [number, number],
    inStock: false,
    isNew: false,
    isFeatured: false,
    origin: '',
    genders: [] as string[],
    sortBy: 'default'
  });

  // Available filter options
  const brands = ['Rare Parfume', 'Luxury Collection', 'Essence Elite', 'Royal Scents'];
  const genders = ['Nam', 'Nữ', 'Unisex'];
  const origins = ['Pháp', 'UAE', 'Anh', 'Ý'];
  const sortOptions = [
    { value: 'default', label: 'Mặc định' },
    { value: 'name-asc', label: 'Tên A-Z' },
    { value: 'name-desc', label: 'Tên Z-A' },
    { value: 'price-asc', label: 'Giá thấp đến cao' },
    { value: 'price-desc', label: 'Giá cao đến thấp' },
    { value: 'rating-desc', label: 'Đánh giá cao nhất' },
    { value: 'newest', label: 'Mới nhất' }
  ];

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...mockProducts];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => filters.brands.includes(product.brand));
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // New products filter
    if (filters.isNew) {
      filtered = filtered.filter(product => product.isNew);
    }

    // Featured products filter
    if (filters.isFeatured) {
      filtered = filtered.filter(product => product.isFeatured);
    }

    // Origin filter
    if (filters.origin) {
      filtered = filtered.filter(product => product.origin === filters.origin);
    }

    // Gender filter - Thêm bộ lọc theo giới tính
    if (filters.genders.length > 0) {
      filtered = filtered.filter(product => filters.genders.includes(product.category));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [filters]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    setSearchParams(params, { replace: true });
  }, [filters.search, setSearchParams]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleBrandToggle = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handleGenderToggle = (gender: string) => {
    setFilters(prev => ({
      ...prev,
      genders: prev.genders.includes(gender)
        ? prev.genders.filter(g => g !== gender)
        : [...prev.genders, gender]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      brands: [],
      priceRange: [0, 10000000],
      inStock: false,
      isNew: false,
      isFeatured: false,
      origin: '',
      genders: [],
      sortBy: 'default'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-elegant-50">
      <Header />
      
      <main className="max-w-7xl mx-auto container-padding section-padding">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="heading-mobile font-serif font-bold text-elegant-900 mb-2 sm:mb-4">
            Sản phẩm
          </h1>
          <p className="text-base sm:text-lg text-elegant-600">
            Khám phá bộ sưu tập nước hoa từ Rare Parfume
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-elegant-200 p-3 sm:p-4 mb-6 sm:mb-8">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-elegant-100 hover:bg-elegant-200 rounded-lg transition-colors duration-200 touch-target"
              >
                <SlidersHorizontal size={18} />
                <span className="text-sm sm:text-base">Bộ lọc</span>
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-elegant-600 hidden sm:inline">Hiển thị:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded touch-target ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-elegant-400 hover:text-elegant-600'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded touch-target ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-elegant-400 hover:text-elegant-600'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-elegant-600">Sắp xếp:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="border border-elegant-300 rounded-lg px-2 py-2 sm:px-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="text-xs sm:text-sm text-elegant-600">
                {filteredProducts.length} sản phẩm
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsFilterOpen(false)}
            ></div>
            
            {/* Filter panel */}
            <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-elegant-900">Bộ lọc</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-elegant-100 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Filter Content - Mobile */}
                <div className="space-y-4">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-elegant-900 mb-2">
                      Tìm kiếm
                    </label>
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      placeholder="Tìm sản phẩm..."
                      className="form-input-mobile"
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-elegant-900 mb-2">
                      Khoảng giá
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="100000"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-elegant-600">
                        <span>0₫</span>
                        <span>{formatPrice(filters.priceRange[1])}</span>
                      </div>
                    </div>
                  </div>

                  {/* Origins */}
                  <div>
                    <label className="block text-sm font-medium text-elegant-900 mb-2">
                      Xuất xứ
                    </label>
                    <select
                      value={filters.origin}
                      onChange={(e) => handleFilterChange('origin', e.target.value)}
                      className="form-input-mobile"
                    >
                      <option value="">Tất cả</option>
                      {origins.map(origin => (
                        <option key={origin} value={origin}>{origin}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <label className="block text-sm font-medium text-elegant-900 mb-2">
                      Bộ lọc nhanh
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.inStock}
                          onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm">Còn hàng</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.isNew}
                          onChange={(e) => handleFilterChange('isNew', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm">Sản phẩm mới</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.isFeatured}
                          onChange={(e) => handleFilterChange('isFeatured', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm">Sản phẩm nổi bật</span>
                      </label>
                    </div>
                  </div>

                  {/* Genders Filter */}
                  <div>
                    <label className="block text-sm font-medium text-elegant-900 mb-2">
                      Giới tính
                    </label>
                    <div className="space-y-2">
                      {genders.map(gender => (
                        <label key={gender} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.genders.includes(gender)}
                            onChange={() => handleGenderToggle(gender)}
                            className="mr-2"
                          />
                          <span className="text-sm">{gender}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brands Filter */}
                  <div>
                    <label className="block text-sm font-medium text-elegant-900 mb-2">
                      Thương hiệu
                    </label>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.brands.includes(brand)}
                            onChange={() => handleBrandToggle(brand)}
                            className="mr-2"
                          />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2 pt-4">
                    <button
                      onClick={clearAllFilters}
                      className="flex-1 btn-secondary"
                    >
                      Xóa bộ lọc
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 btn-primary"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-6 sm:gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-elegant-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-elegant-900">Bộ lọc</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Xóa tất cả
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-elegant-900 mb-2">
                    Tìm kiếm
                  </label>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Tìm sản phẩm..."
                    className="w-full px-3 py-2 border border-elegant-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-elegant-900 mb-2">
                    Khoảng giá
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000000"
                      step="100000"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-elegant-600">
                      <span>0₫</span>
                      <span>{formatPrice(filters.priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Origins */}
                <div>
                  <label className="block text-sm font-medium text-elegant-900 mb-2">
                    Xuất xứ
                  </label>
                  <select
                    value={filters.origin}
                    onChange={(e) => handleFilterChange('origin', e.target.value)}
                    className="w-full px-3 py-2 border border-elegant-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Tất cả</option>
                    {origins.map(origin => (
                      <option key={origin} value={origin}>{origin}</option>
                    ))}
                  </select>
                </div>

                {/* Quick Filters */}
                <div>
                  <label className="block text-sm font-medium text-elegant-900 mb-2">
                    Bộ lọc nhanh
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Còn hàng</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.isNew}
                        onChange={(e) => handleFilterChange('isNew', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Sản phẩm mới</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.isFeatured}
                        onChange={(e) => handleFilterChange('isFeatured', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Sản phẩm nổi bật</span>
                    </label>
                  </div>
                </div>

                {/* Genders Filter */}
                <div>
                  <label className="block text-sm font-medium text-elegant-900 mb-2">
                    Giới tính
                  </label>
                  <div className="space-y-2">
                    {genders.map(gender => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.genders.includes(gender)}
                          onChange={() => handleGenderToggle(gender)}
                          className="mr-2 rounded border-elegant-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands Filter */}
                <div>
                  <label className="block text-sm font-medium text-elegant-900 mb-2">
                    Thương hiệu
                  </label>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="mr-2 rounded border-elegant-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'product-grid-mobile' 
                  : 'space-y-4 sm:space-y-6'
                }
              `}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl text-elegant-300 mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-elegant-900 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-elegant-600 mb-4">
                  Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-primary"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products; 