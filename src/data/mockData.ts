import { Product, Review } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Midnight Orchid',
    brand: 'Rare Parfume',
    category: 'Nữ',
    price: 2890000,
    originalPrice: 3200000,
    description: 'Một tác phẩm nghệ thuật hương thơm với hương hoa lan đêm quyến rũ, pha trộn cùng các nốt hương gỗ quý hiếm và xạ hương trắng tinh tế.',
    ingredients: ['Hoa lan đêm', 'Gỗ trầm hương', 'Xạ hương trắng', 'Hổ phách', 'Vani Madagascar'],
    notes: {
      top: ['Bergamot', 'Hoa lan đêm', 'Lá violet'],
      middle: ['Hoa hồng Bulgaria', 'Nhài sambac', 'Hoa huệ'],
      base: ['Gỗ trầm hương', 'Xạ hương trắng', 'Hổ phách', 'Vani']
    },
    volume: '50ml',
    volumes: [
      {
        size: '30ml',
        price: 2190000,
        originalPrice: 2450000,
        inStock: true,
        stockQuantity: 15
      },
      {
        size: '50ml',
        price: 2890000,
        originalPrice: 3200000,
        inStock: true,
        stockQuantity: 8
      },
      {
        size: '100ml',
        price: 4850000,
        originalPrice: 5200000,
        inStock: true,
        stockQuantity: 3
      }
    ],
    origin: 'Pháp',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
      'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500'
    ],
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Golden Oud',
    brand: 'Rare Parfume',
    category: 'Unisex',
    price: 4200000,
    description: 'Tinh hoa của gỗ trầm hương Oud cổ điển kết hợp với saffron và hoa hồng Damask, tạo nên một mùi hương đậm đà và sang trọng.',
    ingredients: ['Oud Campuchia', 'Saffron Iran', 'Hoa hồng Damask', 'Gỗ đàn hương', 'Long diên hương'],
    notes: {
      top: ['Saffron', 'Hoa hồng Damask', 'Cardamom'],
      middle: ['Oud Campuchia', 'Gỗ đàn hương', 'Hoa diên vĩ'],
      base: ['Long diên hương', 'Hổ phách xám', 'Gỗ cedar']
    },
    volume: '50ml',
    volumes: [
      {
        size: '30ml',
        price: 3200000,
        inStock: false,
        stockQuantity: 0
      },
      {
        size: '50ml',
        price: 4200000,
        inStock: true,
        stockQuantity: 5
      },
      {
        size: '100ml',
        price: 7500000,
        inStock: true,
        stockQuantity: 2
      }
    ],
    origin: 'UAE',
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500',
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500'
    ],
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Crystal Rose',
    brand: 'Rare Parfume',
    category: 'Nữ',
    price: 3150000,
    originalPrice: 3500000,
    description: 'Hương hoa hồng tinh khiết từ thung lũng Grasse, Pháp, được chế tác tỉ mỉ với các nốt hương trái cây và gỗ quý.',
    ingredients: ['Hoa hồng Centifolia', 'Lychee', 'Mẫu đơn', 'Gỗ cashmere', 'Xạ hương'],
    notes: {
      top: ['Lychee', 'Cam bergamot', 'Lá cây nho'],
      middle: ['Hoa hồng Centifolia', 'Mẫu đơn', 'Freesia'],
      base: ['Gỗ cashmere', 'Xạ hương', 'Hổ phách']
    },
    volume: '100ml',
    origin: 'Pháp',
    images: [
      'https://images.unsplash.com/photo-1574110906543-483bb32cabcf?w=500',
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500'
    ],
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Velvet Noir',
    brand: 'Rare Parfume',
    category: 'Nam',
    price: 3800000,
    description: 'Mùi hương nam tính mạnh mẽ với các nốt hương thuốc lá, da thuộc và whiskey, dành cho những quý ông lịch lãm.',
    ingredients: ['Thuốc lá Cuba', 'Da thuộc Ý', 'Whiskey', 'Cacao đen', 'Vetiver'],
    notes: {
      top: ['Hạt tiêu đen', 'Bergamot', 'Cardamom'],
      middle: ['Thuốc lá Cuba', 'Da thuộc', 'Hoa oải hương'],
      base: ['Whiskey', 'Cacao đen', 'Vetiver', 'Gỗ tuyết tùng']
    },
    volume: '75ml',
    origin: 'Anh',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500'
    ],
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: '5',
    name: 'Ocean Breeze',
    brand: 'Rare Parfume',
    category: 'Unisex',
    price: 2650000,
    description: 'Cảm giác tươi mát của làn gió biển với các nốt hương biển cả, muối biển và gỗ trôi.',
    ingredients: ['Muối biển', 'Rong biển', 'Gỗ trôi', 'Hoa huệ nước', 'Ambergris'],
    notes: {
      top: ['Muối biển', 'Bergamot', 'Lemon Sicily'],
      middle: ['Rong biển', 'Hoa huệ nước', 'Cyclamen'],
      base: ['Gỗ trôi', 'Ambergris', 'Xạ hương trắng']
    },
    volume: '50ml',
    origin: 'Ý',
    images: [
      'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500',
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500',
      'https://images.unsplash.com/photo-1574110906543-483bb32cabcf?w=500'
    ],
    rating: 4.5,
    reviewCount: 94,
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: '6',
    name: 'Desert Mirage',
    brand: 'Rare Parfume',
    category: 'Unisex',
    price: 5200000,
    description: 'Hương thơm huyền bí của sa mạc với các gia vị quý hiếm và gỗ thơm từ Trung Đông.',
    ingredients: ['Gỗ trầm hương Oud', 'Saffron', 'Quế Ceylon', 'Hạt dẻ cười', 'Myrrh'],
    notes: {
      top: ['Saffron', 'Quế Ceylon', 'Cardamom'],
      middle: ['Hạt dẻ cười', 'Hoa hồng Persian', 'Myrrh'],
      base: ['Oud superior', 'Long diên hương', 'Hổ phách']
    },
    volume: '30ml',
    origin: 'UAE',
    images: [
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500'
    ],
    rating: 4.9,
    reviewCount: 67,
    inStock: false,
    isFeatured: false
  },
  {
    id: '7',
    name: 'Royal Essence',
    brand: 'Luxury Collection',
    category: 'Nam',
    price: 3500000,
    originalPrice: 3900000,
    description: 'Hương thơm hoàng gia với các nốt hương gỗ quý và gia vị Đông phương.',
    ingredients: ['Gỗ trầm hương', 'Quế', 'Hạt tiêu đen', 'Bergamot', 'Xạ hương'],
    notes: {
      top: ['Bergamot', 'Hạt tiêu đen', 'Chanh vàng'],
      middle: ['Quế', 'Hạt nhục đậu khấu', 'Hoa oải hương'],
      base: ['Gỗ trầm hương', 'Xạ hương', 'Hổ phách']
    },
    volume: '50ml',
    origin: 'Anh',
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500',
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500'
    ],
    rating: 4.4,
    reviewCount: 78,
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: '8',
    name: 'Essence Elite',
    brand: 'Essence Elite',
    category: 'Nữ',
    price: 2800000,
    description: 'Nước hoa nữ thanh lịch với hương hoa tươi mát và phấn đấy quyến rũ.',
    ingredients: ['Hoa nhài', 'Hoa huệ', 'Phấn đấy', 'Gỗ sandalwood', 'Vani'],
    notes: {
      top: ['Hoa nhài', 'Cam bergamot', 'Lá bạc hà'],
      middle: ['Hoa huệ', 'Hoa hồng', 'Freesia'],
      base: ['Phấn đấy', 'Gỗ sandalwood', 'Vani']
    },
    volume: '75ml',
    origin: 'Pháp',
    images: [
      'https://images.unsplash.com/photo-1574110906543-483bb32cabcf?w=500',
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500'
    ],
    rating: 4.3,
    reviewCount: 92,
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: '9',
    name: 'Royal Scents Premium',
    brand: 'Royal Scents',
    category: 'Unisex',
    price: 4800000,
    description: 'Hương thơm cao cấp unisex với sự kết hợp độc đáo giữa hoa và gỗ.',
    ingredients: ['Hoa mẫu đơn', 'Gỗ cedar', 'Hổ phách', 'Bergamot', 'Vetiver'],
    notes: {
      top: ['Bergamot', 'Hoa cam', 'Hạt tiêu hồng'],
      middle: ['Hoa mẫu đơn', 'Hoa diên vĩ', 'Gỗ cedar'],
      base: ['Hổ phách', 'Vetiver', 'Xạ hương trắng']
    },
    volume: '100ml',
    origin: 'Ý',
    images: [
      'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500'
    ],
    rating: 4.6,
    reviewCount: 45,
    inStock: true,
    isNew: false,
    isFeatured: true
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userName: 'Minh Anh',
    rating: 5,
    comment: 'Mùi hương tuyệt vời! Rất lâu phai và đặc biệt. Đây là chai nước hoa đáng đầu tư nhất mà tôi từng mua.',
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    productId: '1',
    userName: 'Hoàng Nam',
    rating: 4,
    comment: 'Chất lượng tốt, mùi hương độc đáo. Tuy nhiên giá hơi cao so với mong đợi.',
    date: '2024-01-10',
    verified: true
  },
  {
    id: '3',
    productId: '2',
    userName: 'Lan Phương',
    rating: 5,
    comment: 'Golden Oud thực sự xứng đáng với giá tiền. Mùi hương sang trọng và cuốn hút.',
    date: '2024-01-12',
    verified: true
  }
];

export const categories = [
  'Tất cả',
  'Nam',
  'Nữ', 
  'Unisex',
  'Mới nhất',
  'Bán chạy'
];

export const brands = [
  'Rare Parfume',
  'Luxury Collection',
  'Essence Elite',
  'Royal Scents'
];

export const sortOptions = [
  { value: 'name-asc', label: 'Tên A-Z' },
  { value: 'name-desc', label: 'Tên Z-A' },
  { value: 'price-asc', label: 'Giá thấp đến cao' },
  { value: 'price-desc', label: 'Giá cao đến thấp' },
  { value: 'rating-desc', label: 'Đánh giá cao nhất' },
  { value: 'newest', label: 'Mới nhất' }
]; 