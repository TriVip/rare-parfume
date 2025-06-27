# Hướng dẫn Cấu hình Trang Thanh toán

## Tổng quan
Hệ thống thanh toán đã được thiết kế với UI/UX rõ ràng và hỗ trợ 3 phương thức thanh toán:
- Thanh toán qua QR Code
- Chuyển khoản ngân hàng
- Thanh toán khi nhận hàng (COD)

## 🏗️ Cấu trúc Components

### 1. Trang Chính
- **`src/pages/Checkout.tsx`** - Trang thanh toán chính với 3 bước
- **`src/components/OrderSummary.tsx`** - Hiển thị tóm tắt đơn hàng
- **`src/components/CustomerInfoForm.tsx`** - Form thông tin khách hàng
- **`src/components/PaymentSection.tsx`** - Phần thanh toán
- **`src/components/OrderConfirmation.tsx`** - Xác nhận đơn hàng

### 2. Context Management
- **`src/context/OrderContext.tsx`** - Quản lý đơn hàng, chuẩn bị cho backend
- **`src/types/index.ts`** - Type definitions cho thanh toán

## 📱 Cách thêm QR Code Ngân hàng của bạn

### Bước 1: Tạo QR Code
1. Sử dụng ứng dụng ngân hàng để tạo QR Code
2. Hoặc sử dụng VietQR API:
```javascript
// Ví dụ URL VietQR
const generateQRCode = (amount, content) => {
  const bankCode = "YOUR_BANK_CODE"; // VCB, TPB, TCB, etc.
  const accountNumber = "YOUR_ACCOUNT_NUMBER";
  return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${content}`;
};
```

### Bước 2: Cập nhật Component PaymentSection
Trong file `src/components/PaymentSection.tsx`, thay thế phần placeholder QR Code:

```typescript
// Tìm dòng này (khoảng dòng 65):
...(selectedMethod.type === 'qr' && {
  qrCodeUrl: '/api/qr-code' // Placeholder - you'll replace with actual QR code
}),

// Thay thế bằng:
...(selectedMethod.type === 'qr' && {
  qrCodeUrl: generateQRCode(total, 'Thanh toan don hang')
}),
```

### Bước 3: Cập nhật thông tin ngân hàng
Trong cùng file, cập nhật thông tin chuyển khoản:

```typescript
...(selectedMethod.type === 'bank_transfer' && {
  bankDetails: {
    bankName: 'Tên ngân hàng của bạn',
    accountNumber: 'Số tài khoản của bạn',
    accountHolder: 'Tên chủ tài khoản'
  }
})
```

## 🔗 Cách kết nối Backend

### 1. API Endpoints cần thiết

#### Tạo đơn hàng
```
POST /api/orders
Body: {
  customerInfo: CustomerInfo,
  items: CartItem[],
  paymentMethod: PaymentMethod,
  total: number,
  // ... other order data
}
Response: Order
```

#### Cập nhật trạng thái đơn hàng
```
PATCH /api/orders/:orderId/status
Body: {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
}
```

#### Lấy thông tin đơn hàng
```
GET /api/orders/:orderId
Response: Order

GET /api/users/:userId/orders
Response: Order[]
```

### 2. Cập nhật OrderContext

Trong file `src/context/OrderContext.tsx`, uncomment và cập nhật các API call:

```typescript
const createOrder = async (orderData: OrderCreate): Promise<Order> => {
  // Uncomment và cập nhật URL API của bạn
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Nếu cần authentication
    },
    body: JSON.stringify(orderData)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  
  const order = await response.json();
  dispatch({ type: 'ADD_ORDER', payload: order });
  return order;
};
```

### 3. Environment Variables

Tạo file `.env.local`:
```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_BANK_CODE=YOUR_BANK_CODE
REACT_APP_ACCOUNT_NUMBER=YOUR_ACCOUNT_NUMBER
REACT_APP_ACCOUNT_HOLDER=YOUR_ACCOUNT_HOLDER_NAME
```

### 4. Xử lý thanh toán QR Code

```typescript
// utils/payment.ts
export const generateVietQR = (amount: number, content: string) => {
  const bankCode = process.env.REACT_APP_BANK_CODE;
  const accountNumber = process.env.REACT_APP_ACCOUNT_NUMBER;
  
  return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(content)}`;
};
```

## 🎨 Customization

### Thay đổi theme colors
Cập nhật classes trong Tailwind:
- `bg-blue-600` → `bg-your-brand-color`
- `text-blue-600` → `text-your-brand-color`

### Thêm ngôn ngữ khác
Tạo file translation và sử dụng i18n library.

### Thêm phương thức thanh toán mới
1. Cập nhật `PaymentMethod` type trong `types/index.ts`
2. Thêm method mới trong `PaymentSection.tsx`
3. Thêm xử lý trong `OrderConfirmation.tsx`

## 🔒 Bảo mật

1. **Validation**: Đã có client-side validation, thêm server-side validation
2. **Sanitization**: Sanitize tất cả input từ user
3. **Rate limiting**: Implement rate limiting cho API
4. **HTTPS**: Sử dụng HTTPS cho production
5. **Payment verification**: Verify payment status từ bank webhook

## 📧 Email Notifications

Để gửi email xác nhận đơn hàng:

```typescript
// Backend service
const sendOrderConfirmation = async (order: Order) => {
  // Sử dụng service như Nodemailer, SendGrid, etc.
  await emailService.send({
    to: order.customerInfo.email,
    subject: `Xác nhận đơn hàng #${order.id}`,
    template: 'order-confirmation',
    data: { order }
  });
};
```

## 🚀 Deployment Checklist

- [ ] Cập nhật QR Code với thông tin thật
- [ ] Cập nhật thông tin ngân hàng
- [ ] Kết nối API endpoints
- [ ] Test toàn bộ flow thanh toán
- [ ] Setup error monitoring
- [ ] Setup payment webhooks
- [ ] Test responsive design
- [ ] Setup analytics tracking

## 📞 Support

Nếu cần hỗ trợ thêm, vui lòng:
1. Check console logs để debug
2. Verify API endpoints hoạt động
3. Test với các trình duyệt khác nhau
4. Check mobile responsiveness 