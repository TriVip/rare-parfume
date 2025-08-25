-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category VARCHAR(100),
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  status VARCHAR(50) DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB,
  payment_intent_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table to store additional user information
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name VARCHAR(255),
  phone VARCHAR(50),
  address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Products are viewable by everyone
CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT 
USING (true);

-- Orders are viewable by the user who created them
CREATE POLICY "Orders are viewable by the user who created them" 
ON orders FOR SELECT 
USING (auth.uid() = user_id);

-- Orders can be inserted by authenticated users
CREATE POLICY "Orders can be inserted by authenticated users" 
ON orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Order items are viewable by the user who owns the order
CREATE POLICY "Order items are viewable by the user who owns the order" 
ON order_items FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )
);

-- Order items can be inserted by authenticated users who own the order
CREATE POLICY "Order items can be inserted by authenticated users who own the order" 
ON order_items FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )
);

-- User profiles are viewable by the user who owns the profile
CREATE POLICY "User profiles are viewable by the user who owns the profile" 
ON user_profiles FOR SELECT 
USING (auth.uid() = id);

-- User profiles can be updated by the user who owns the profile
CREATE POLICY "User profiles can be updated by the user who owns the profile" 
ON user_profiles FOR UPDATE 
USING (auth.uid() = id);

-- User profiles can be inserted by the user who owns the profile
CREATE POLICY "User profiles can be inserted by the user who owns the profile" 
ON user_profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Sample product data
INSERT INTO products (name, description, price, image_url, category, in_stock) VALUES
('Chanel No. 5', 'A classic floral aldehyde fragrance with notes of rose, jasmine, and vanilla.', 150.00, 'https://example.com/chanel-no5.jpg', 'Women', TRUE),
('Dior Sauvage', 'A fresh and spicy fragrance with notes of bergamot, pepper, and ambroxan.', 120.00, 'https://example.com/dior-sauvage.jpg', 'Men', TRUE),
('Tom Ford Black Orchid', 'A luxurious and sensual fragrance with notes of black truffle, ylang-ylang, and patchouli.', 180.00, 'https://example.com/tom-ford-black-orchid.jpg', 'Unisex', TRUE),
('Jo Malone Wood Sage & Sea Salt', 'A fresh and earthy fragrance with notes of ambrette seeds, sea salt, and sage.', 140.00, 'https://example.com/jo-malone-wood-sage.jpg', 'Unisex', TRUE),
('Creed Aventus', 'A fruity and rich fragrance with notes of pineapple, birch, and ambergris.', 350.00, 'https://example.com/creed-aventus.jpg', 'Men', TRUE);
