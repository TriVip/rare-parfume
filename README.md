# Rare Parfume - Website Thương Mại Điện Tử Nước Hoa Cao Cấp

Website thương mại điện tử chuyên bán nước hoa cao cấp, đặc biệt là các dòng Rare Parfume với thiết kế hiện đại và trải nghiệm người dùng tuyệt vời.

## ✨ Tính Năng

### 🎯 Trải Nghiệm Người Dùng (UI/UX)
- **Đối tượng**: Người dùng từ 18 tuổi trở lên với gu thẩm mỹ cao
- **Thiết kế**: Giao diện sang trọng, hiện đại và trực quan
- **Responsive**: Tối ưu cho cả desktop và mobile
- **Theme**: Màu sắc tinh tế thể hiện sự độc đáo của nước hoa cao cấp

### 🛒 Tính Năng Cốt Lõi

#### 🏠 Trang Chủ (Homepage)
- Hero section với animation đẹp mắt
- Hiển thị sản phẩm nổi bật và mới nhất
- Banner quảng cáo hấp dẫn
- Testimonials từ khách hàng
- Features section (miễn phí vận chuyển, hàng chính hãng, etc.)

#### 📦 Trang Sản Phẩm (Product Listing)
- Hiển thị danh sách sản phẩm với grid layout
- Bộ lọc theo thương hiệu, loại hương, giá cả
- Sắp xếp theo giá, đánh giá, mức độ phổ biến
- Phân trang

#### 🔍 Trang Chi Tiết Sản Phẩm
- Hình ảnh chất lượng cao với multiple views
- Mô tả chi tiết: thành phần, nốt hương, xuất xứ
- Đánh giá và nhận xét khách hàng
- Sản phẩm liên quan
- Add to cart functionality

#### 🛍️ Giỏ Hàng (Shopping Cart)
- Slide-out cart với animation mượt
- Cập nhật số lượng, xóa sản phẩm
- Tính toán tổng tiền real-time
- Thông báo miễn phí vận chuyển

#### 👤 Tính Năng Khác
- Header với search và navigation
- Footer với thông tin liên hệ đầy đủ
- Newsletter subscription
- Social media links

## 🚀 Công Nghệ Sử Dụng

### Frontend
- **React 18** với TypeScript
- **Tailwind CSS** cho styling
- **React Router** cho navigation
- **Lucide React** cho icons
- **Context API** cho state management

### Styling & UI
- **Custom design system** với elegant color palette
- **Responsive design** với mobile-first approach
- **CSS animations** và transitions
- **Custom components** với consistent styling

## 📁 Cấu Trúc Dự Án

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── ProductCard.tsx # Product display card
│   └── Cart.tsx        # Shopping cart
├── pages/              # Page components
│   └── Home.tsx        # Homepage
├── context/            # React contexts
│   └── CartContext.tsx # Cart state management
├── data/               # Mock data
│   └── mockData.ts     # Product and review data
├── types/              # TypeScript definitions
│   └── index.ts        # Interface definitions
├── utils/              # Utility functions
│   └── index.ts        # Helper functions
└── App.tsx             # Main app component
```

## 🛠️ Cài Đặt và Chạy

### Prerequisites
- Node.js (v14 hoặc cao hơn)
- npm hoặc yarn

### Cài đặt
```bash
# Clone repository
git clone [repository-url]
cd rare-parfume-website

# Cài đặt dependencies
npm install

# Chạy development server
npm start
```

### Build cho production
```bash
npm run build
```

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (#d946ef)
- **Gold**: Luxury gold accents (#f59e0b)
- **Elegant**: Gray scale for text and backgrounds

### Typography
- **Headers**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- Custom button styles (primary, secondary)
- Card components with hover effects
- Product cards with image zoom
- Responsive grid layouts

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Tính Năng Nâng Cao

### Cart Management
- Add/remove products
- Quantity updates
- Persistent state
- Price calculations
- Free shipping notifications

### Product Features
- Multiple product images
- Detailed fragrance notes
- Rating system
- Stock status
- Price comparison

### Search & Filter
- Real-time search
- Category filtering
- Sort options
- Mobile-friendly filters

## 🚀 Triển Khai

Website có thể dễ dàng triển khai lên:
- **Netlify**
- **Vercel**
- **Firebase Hosting**
- **GitHub Pages**

## 🔒 Bảo Mật

- Input validation
- XSS protection
- Safe state management
- Environment variables for sensitive data

## 📈 Hiệu Năng

- Code splitting
- Image optimization
- Lazy loading
- Minimal bundle size
- Fast loading times

## 🎯 Mục Tiêu Tương Lai

- [ ] Backend integration
- [ ] User authentication
- [ ] Payment gateway
- [ ] Admin dashboard
- [ ] Order management
- [ ] Email notifications
- [ ] SEO optimization
- [ ] Performance monitoring

## 👥 Đóng Góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên Hệ

- **Website**: https://rareparfume.vn
- **Email**: support@rareparfume.vn
- **Phone**: +84 1900 2345

---

Được phát triển với ❤️ để mang đến trải nghiệm mua sắm nước hoa cao cấp tốt nhất cho khách hàng Việt Nam.
