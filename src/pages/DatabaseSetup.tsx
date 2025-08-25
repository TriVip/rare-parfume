import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DatabaseSetup: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const createTables = async () => {
    setIsLoading(true);
    setStatus('Creating tables...');
    
    try {
      // Note: In Supabase, regular users can't create tables through the client API
      // We'll use the REST API to create tables, but this typically requires admin privileges
      setStatus('Important: Table creation requires admin privileges in Supabase');
      setStatus('Please use the Supabase dashboard SQL editor to create tables');
      
      // Show the SQL that needs to be executed in the Supabase dashboard
      const createTablesSql = `
-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
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
CREATE TABLE IF NOT EXISTS public.orders (
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
CREATE TABLE IF NOT EXISTS public.order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name VARCHAR(255),
  phone VARCHAR(50),
  address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Products are viewable by everyone
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

-- Orders are viewable by the user who created them
CREATE POLICY "Orders are viewable by the user who created them" 
ON public.orders FOR SELECT 
USING (auth.uid() = user_id);

-- Orders can be inserted by authenticated users
CREATE POLICY "Orders can be inserted by authenticated users" 
ON public.orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Order items are viewable by the user who owns the order
CREATE POLICY "Order items are viewable by the user who owns the order" 
ON public.order_items FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE public.orders.id = public.order_items.order_id 
    AND public.orders.user_id = auth.uid()
  )
);
      `;
      
      // Instead of trying to create tables, check if they exist
      setStatus('Checking if tables exist...');
      
      // Check if products table exists
      const { error: checkError } = await supabase
        .from('products')
        .select('count')
        .limit(1)
        .single();
        
      if (checkError) {
        setStatus('Tables do not exist. Please create them in the Supabase dashboard SQL editor.');
        setResult({ 
          success: false, 
          message: 'Tables need to be created in the Supabase dashboard',
          sql: createTablesSql 
        });
      } else {
        setStatus('Tables already exist!');
        setResult({ success: true, message: 'Tables already exist' });
      }
    } catch (error: any) {
      setStatus(`Error creating tables: ${error.message}`);
      setResult({ success: false, error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const insertSampleData = async () => {
    setIsLoading(true);
    setStatus('Inserting sample data...');
    
    try {
      // First check if products table exists
      const { error: checkError } = await supabase
        .from('products')
        .select('count')
        .limit(1);
      
      if (checkError) {
        setStatus('Error: Products table does not exist. Please create tables first.');
        setResult({ 
          success: false, 
          message: 'Products table does not exist. Please create tables first using the SQL Editor.'
        });
        return;
      }
      
      // Check if there are already products
      const { data: existingProducts, error: countError } = await supabase
        .from('products')
        .select('id')
        .limit(1);
      
      if (!countError && existingProducts && existingProducts.length > 0) {
        setStatus('Products already exist in the database.');
        setResult({ 
          success: true, 
          message: 'Sample data already exists. Skipping insertion.'
        });
        return;
      }
      
      // Insert sample products
      const sampleProducts = [
        {
          name: 'Chanel No. 5',
          description: 'A classic floral aldehyde fragrance with notes of rose, jasmine, and vanilla.',
          price: 150.00,
          image_url: 'https://example.com/chanel-no5.jpg',
          category: 'Women',
          in_stock: true
        },
        {
          name: 'Dior Sauvage',
          description: 'A fresh and spicy fragrance with notes of bergamot, pepper, and ambroxan.',
          price: 120.00,
          image_url: 'https://example.com/dior-sauvage.jpg',
          category: 'Men',
          in_stock: true
        },
        {
          name: 'Tom Ford Black Orchid',
          description: 'A luxurious and sensual fragrance with notes of black truffle, ylang-ylang, and patchouli.',
          price: 180.00,
          image_url: 'https://example.com/tom-ford-black-orchid.jpg',
          category: 'Unisex',
          in_stock: true
        },
        {
          name: 'Jo Malone Wood Sage & Sea Salt',
          description: 'A fresh and earthy fragrance with notes of ambrette seeds, sea salt, and sage.',
          price: 140.00,
          image_url: 'https://example.com/jo-malone-wood-sage.jpg',
          category: 'Unisex',
          in_stock: true
        },
        {
          name: 'Creed Aventus',
          description: 'A fruity and rich fragrance with notes of pineapple, birch, and ambergris.',
          price: 350.00,
          image_url: 'https://example.com/creed-aventus.jpg',
          category: 'Men',
          in_stock: true
        }
      ];
      
      const { error: insertError } = await supabase
        .from('products')
        .insert(sampleProducts);
      
      if (insertError) throw insertError;
      
      setStatus('Sample data inserted successfully!');
      setResult({ 
        success: true,
        message: 'Inserted 5 sample products into the database.',
        products: sampleProducts
      });
    } catch (error: any) {
      setStatus(`Error inserting sample data: ${error.message}`);
      setResult({ success: false, error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const checkTables = async () => {
    setIsLoading(true);
    setStatus('Checking tables...');
    
    try {
      const tableResults: any = {};
      let allTablesExist = true;
      
      // Check products table
      try {
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('*');
        
        if (productsError) {
          tableResults.products = { exists: false, error: productsError.message };
          allTablesExist = false;
        } else {
          tableResults.products = { 
            exists: true, 
            count: products?.length || 0,
            sample: products?.slice(0, 2) || []
          };
        }
      } catch (error: any) {
        tableResults.products = { exists: false, error: error.message };
        allTablesExist = false;
      }
      
      // Check orders table
      try {
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .limit(1);
        
        if (ordersError) {
          tableResults.orders = { exists: false, error: ordersError.message };
          allTablesExist = false;
        } else {
          tableResults.orders = { exists: true, count: orders?.length || 0 };
        }
      } catch (error: any) {
        tableResults.orders = { exists: false, error: error.message };
        allTablesExist = false;
      }
      
      // Check order_items table
      try {
        const { data: orderItems, error: orderItemsError } = await supabase
          .from('order_items')
          .select('*')
          .limit(1);
        
        if (orderItemsError) {
          tableResults.order_items = { exists: false, error: orderItemsError.message };
          allTablesExist = false;
        } else {
          tableResults.order_items = { exists: true, count: orderItems?.length || 0 };
        }
      } catch (error: any) {
        tableResults.order_items = { exists: false, error: error.message };
        allTablesExist = false;
      }
      
      // Check user_profiles table
      try {
        const { data: profiles, error: profilesError } = await supabase
          .from('user_profiles')
          .select('*')
          .limit(1);
        
        if (profilesError) {
          tableResults.user_profiles = { exists: false, error: profilesError.message };
          allTablesExist = false;
        } else {
          tableResults.user_profiles = { exists: true, count: profiles?.length || 0 };
        }
      } catch (error: any) {
        tableResults.user_profiles = { exists: false, error: error.message };
        allTablesExist = false;
      }
      
      if (allTablesExist) {
        setStatus('All tables exist in the database!');
      } else {
        setStatus('Some tables are missing. Please create them using the SQL Editor.');
      }
      
      setResult({ 
        success: allTablesExist, 
        tables: tableResults
      });
    } catch (error: any) {
      setStatus(`Error checking tables: ${error.message}`);
      setResult({ success: false, error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Supabase Database Setup</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Database Operations</h2>
            
            <div className="space-y-4">
              <button
                onClick={createTables}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
              >
                Check Tables & Get SQL
              </button>
              
              <button
                onClick={insertSampleData}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50"
              >
                Insert Sample Data
              </button>
              
              <button
                onClick={checkTables}
                disabled={isLoading}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded disabled:opacity-50"
              >
                Check Tables
              </button>
              
              <a
                href="https://app.supabase.com/project/nuohgvcxenhhnonftfwv/sql"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded"
              >
                Open Supabase SQL Editor
              </a>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Status</h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div>
                <div className="mb-4 p-3 border rounded bg-gray-50">
                  <p className={result?.success ? 'text-green-600' : 'text-red-500'}>
                    {status}
                  </p>
                </div>
                
                {result?.sql && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">SQL to execute in Supabase Dashboard:</h3>
                    <div className="relative">
                      <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-60">
                        {result.sql}
                      </pre>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(result.sql);
                          alert('SQL copied to clipboard!');
                        }}
                        className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded text-xs"
                        title="Copy SQL"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Copy this SQL and run it in the Supabase SQL Editor to create your tables.
                    </p>
                  </div>
                )}
                
                {result && !result.sql && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Result:</h3>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-60">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DatabaseSetup;
