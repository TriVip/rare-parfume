// Payment utility functions

// Generate VietQR URL for bank transfer
export const generateVietQR = (amount: number, content: string): string => {
  const bankCode = process.env.REACT_APP_BANK_CODE || 'VCB';
  const accountNumber = process.env.REACT_APP_ACCOUNT_NUMBER || '1234567890';
  
  return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(content)}`;
};

// Get bank details for manual transfer
export const getBankDetails = () => {
  return {
    bankCode: process.env.REACT_APP_BANK_CODE || 'VCB',
    bankName: getBankName(process.env.REACT_APP_BANK_CODE || 'VCB'),
    accountNumber: process.env.REACT_APP_ACCOUNT_NUMBER || '1234567890',
    accountHolder: process.env.REACT_APP_ACCOUNT_HOLDER || 'NGUYEN VAN A'
  };
};

// Map bank codes to bank names
const getBankName = (bankCode: string): string => {
  const bankNames: { [key: string]: string } = {
    'VCB': 'Vietcombank',
    'TCB': 'Techcombank',
    'TPB': 'TPBank',
    'VTB': 'VietinBank',
    'BIDV': 'BIDV',
    'MBB': 'MB Bank',
    'SHB': 'SHB',
    'ACB': 'ACB',
    'VPB': 'VPBank',
    'OCB': 'OCB'
  };
  
  return bankNames[bankCode] || bankCode;
};

// Format payment amount for display
export const formatPaymentAmount = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

// Generate transfer content for bank transfer
export const generateTransferContent = (orderId: string): string => {
  return `DH ${orderId} RareParfume`;
};

// Validate bank account number format
export const validateBankAccount = (accountNumber: string): boolean => {
  // Basic validation - at least 8 digits, max 20 digits
  const cleaned = accountNumber.replace(/\s/g, '');
  return /^\d{8,20}$/.test(cleaned);
};

// Check if payment method is available
export const isPaymentMethodAvailable = (method: string): boolean => {
  const availableMethods = ['qr', 'bank_transfer', 'cash'];
  return availableMethods.includes(method);
}; 