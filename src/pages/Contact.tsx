import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Vui lòng chọn chủ đề';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập nội dung tin nhắn';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Tin nhắn phải có ít nhất 10 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1000);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Địa chỉ showroom',
      details: [
        '136/4 Trần Quang Diệu, Phường 14',
        'Quận 3, TP. Hồ Chí Minh'
      ]
    },
    {
      icon: Phone,
      title: 'Hotline',
      details: [
        '1900 2345 (Miễn phí)',
        '028 3823 4567'
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'support@rareparfume.vn',
        'sale@rareparfume.vn'
      ]
    },
    {
      icon: Clock,
      title: 'Giờ mở cửa',
      details: [
        'Thứ 2 - Thứ 6: 9:00 - 21:00',
        'Thứ 7 - CN: 9:00 - 22:00'
      ]
    }
  ];

  const subjects = [
    'Tư vấn sản phẩm',
    'Hỗ trợ đơn hàng',
    'Khiếu nại - Góp ý',
    'Đối tác - Hợp tác',
    'Khác'
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-60 sm:h-72 md:h-80 flex items-center justify-center luxury-gradient">
        <div className="absolute inset-8 sm:inset-16 bg-black/5 rounded-2xl sm:rounded-3xl"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto container-padding">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-elegant-900 mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-elegant-600 leading-relaxed max-w-[900px] mx-auto">
            Chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn tìm được mùi hương hoàn hảo
          </p>
        </div>
      </section>

      {/* Success Message */}
      {isSubmitted && (
        <div className="bg-green-50 border border-green-200 mx-4 sm:mx-6 lg:mx-8 my-6 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="text-green-800 font-semibold">Gửi tin nhắn thành công!</h3>
            <p className="text-green-700 text-sm">Chúng tôi sẽ phản hồi bạn trong vòng 24 giờ.</p>
          </div>
        </div>
      )}

      <div className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card card-mobile">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-elegant-900 mb-2">
                    Gửi tin nhắn cho chúng tôi
                  </h2>
                  <p className="text-elegant-600">
                    Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với bạn sớm nhất
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-elegant-700 mb-2">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`form-input-mobile ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Nhập họ và tên của bạn"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-elegant-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-input-mobile ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="example@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone and Subject Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-elegant-700 mb-2">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-input-mobile ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="0123 456 789"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-elegant-700 mb-2">
                        Chủ đề <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`form-input-mobile ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
                      >
                        <option value="">Chọn chủ đề</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-elegant-700 mb-2">
                      Nội dung tin nhắn <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`form-input-mobile resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Chia sẻ chi tiết về yêu cầu của bạn..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                    <p className="mt-1 text-sm text-elegant-500">
                      Tối thiểu 10 ký tự ({formData.message.length}/10)
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitted}
                      className="btn-primary w-full sm:w-auto inline-flex items-center justify-center space-x-2 touch-target disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                      <span>{isSubmitted ? 'Đang gửi...' : 'Gửi tin nhắn'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 lg:space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="card card-mobile">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-primary-600" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-elegant-900 mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-elegant-600 text-sm sm:text-base break-words">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Contact */}
              <div className="card card-mobile bg-gradient-to-br from-primary-50 to-gold-50">
                <h3 className="text-lg font-semibold text-elegant-900 mb-3">
                  Cần hỗ trợ ngay?
                </h3>
                <p className="text-elegant-600 text-sm mb-4">
                  Liên hệ trực tiếp với đội ngũ tư vấn chuyên nghiệp của chúng tôi
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:19002345"
                    className="btn-primary w-full inline-flex items-center justify-center space-x-2 touch-target"
                  >
                    <Phone size={18} />
                    <span>Gọi ngay: 1900 2345</span>
                  </a>
                  <a
                    href="mailto:support@rareparfume.vn"
                    className="btn-secondary w-full inline-flex items-center justify-center space-x-2 touch-target"
                  >
                    <Mail size={18} />
                    <span>Email hỗ trợ</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact; 