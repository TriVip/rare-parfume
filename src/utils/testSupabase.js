import { supabase } from './supabaseClient';

// Function to test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    // Try to get the current user
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      return { success: false, message: error.message };
    }
    
    console.log('Successfully connected to Supabase!');
    console.log('User data:', data);
    
    return { success: true, data };
  } catch (error) {
    console.error('Exception when connecting to Supabase:', error.message);
    return { success: false, message: error.message };
  }
};

// Function to test database access
export const testDatabaseAccess = async () => {
  try {
    // Try to query the public schema version
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('Error accessing database:', error.message);
      return { success: false, message: error.message };
    }
    
    console.log('Successfully queried database!');
    console.log('Products data:', data);
    
    return { success: true, data };
  } catch (error) {
    console.error('Exception when accessing database:', error.message);
    return { success: false, message: error.message };
  }
};
