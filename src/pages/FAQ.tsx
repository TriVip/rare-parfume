import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail, FileText, ShoppingCart, Truck, CreditCard, RotateCcw, Package, Shield } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Làm thế nào để đặt hàng trên website?",
      answer: "Bạn có thể đặt hàng bằng cách: 1) Chọn sản phẩm yêu thích 2) Thêm vào giỏ hàng 3) Điền thông tin giao hàng 4) Chọn phương thức thanh toán 5) Xác nhận đơn hàng",
      category: "order"
    },
    {
      id: 2,
      question: "Thời gian giao hàng là bao lâu?",
      answer: "Thời gian giao hàng: Nội thành Hà Nội và TP.HCM: 1-2 ngày. Các tỉnh thành khác: 3-5 ngày làm việc. Đơn hàng trên 500k được miễn phí ship.",
      category: "shipping"
    },
    {
      id: 3,
      question: "Có thể đổi trả sản phẩm không?",
      answer: "Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày kể từ khi nhận hàng với điều kiện: sản phẩm còn nguyên vẹn, chưa sử dụng, còn tem mác và hóa đơn mua hàng.",
      category: "return"
    },
    {
      id: 4,
      question: "Các hình thức thanh toán được hỗ trợ?",
      answer: "Chúng tôi hỗ trợ: COD (thanh toán khi nhận hàng), chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay), thẻ tín dụng/ghi nợ quốc tế.",
      category: "payment"
    },
    {
      id: 5,
      question: "Làm sao để biết sản phẩm còn hàng hay không?",
      answer: "Trạng thái tồn kho được hiển thị trên trang sản phẩm. Nếu hết hàng sẽ có thông báo 'Tạm hết hàng'. Bạn có thể đăng ký nhận thông báo khi hàng về.",
      category: "product"
    },
    {
      id: 6,
      question: "Có bảo hành cho sản phẩm không?",
      answer: "Tất cả sản phẩm đều có bảo hành chất lượng. Thời gian bảo hành từ 6-12 tháng tùy theo từng sản phẩm. Chi tiết bảo hành xem tại trang Chính sách bảo hành.",
      category: "warranty"
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả', icon: FileText },
    { id: 'order', name: 'Đặt hàng', icon: ShoppingCart },
    { id: 'shipping', name: 'Vận chuyển', icon: Truck },
    { id: 'payment', name: 'Thanh toán', icon: CreditCard },
    { id: 'return', name: 'Đổi trả', icon: RotateCcw },
    { id: 'product', name: 'Sản phẩm', icon: Package },
    { id: 'warranty', name: 'Bảo hành', icon: Shield }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Câu Hỏi Thường Gặp
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tìm câu trả lời nhanh chóng cho các thắc mắc của bạn
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-slide-up"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
              >
                <span className="font-medium text-gray-800 pr-4">{item.question}</span>
                {openItems.includes(item.id) ? (
                  <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4 text-gray-600 animate-fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-slide-up" style={{ animationDelay: '1s' }}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Không tìm thấy câu trả lời?
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Hãy liên hệ với chúng tôi để được hỗ trợ tốt nhất
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="tel:+84123456789"
              className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
            >
              <Phone className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-600 font-medium">Hotline: 0123 456 789</span>
            </a>
            <a
              href="mailto:support@example.com"
              className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              <Mail className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-blue-600 font-medium">Email hỗ trợ</span>
            </a>
            <button className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
              <MessageCircle className="w-5 h-5 text-purple-600 mr-3" />
              <span className="text-purple-600 font-medium">Live Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 