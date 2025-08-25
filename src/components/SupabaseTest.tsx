import React, { useEffect, useState } from 'react';
import { testSupabaseConnection, testDatabaseAccess } from '../utils/testSupabase';

const SupabaseTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking connection...');
  const [databaseStatus, setDatabaseStatus] = useState<string>('Checking database...');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkConnection = async () => {
      setIsLoading(true);
      
      // Test Supabase connection
      const connectionResult = await testSupabaseConnection();
      setConnectionStatus(
        connectionResult.success 
          ? 'Connected to Supabase successfully!' 
          : `Connection error: ${connectionResult.message}`
      );
      
      // Test database access
      const databaseResult = await testDatabaseAccess();
      setDatabaseStatus(
        databaseResult.success 
          ? `Database access successful! Found ${databaseResult.data?.length || 0} products.` 
          : `Database error: ${databaseResult.message}`
      );
      
      setIsLoading(false);
    };
    
    checkConnection();
  }, []);

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Supabase Connection Test</h2>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h3 className="font-medium">Authentication Status:</h3>
          {isLoading ? (
            <p className="text-gray-500">Checking...</p>
          ) : (
            <p className={connectionStatus.includes('error') ? 'text-red-500' : 'text-green-600'}>
              {connectionStatus}
            </p>
          )}
        </div>
        
        <div className="p-4 border rounded">
          <h3 className="font-medium">Database Status:</h3>
          {isLoading ? (
            <p className="text-gray-500">Checking...</p>
          ) : (
            <p className={databaseStatus.includes('error') ? 'text-red-500' : 'text-green-600'}>
              {databaseStatus}
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Environment Variables:
        </p>
        <p className="text-xs text-gray-400 break-all mt-1">
          SUPABASE_URL: {process.env.REACT_APP_SUPABASE_URL}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          ANON_KEY: {process.env.REACT_APP_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'}
        </p>
      </div>
    </div>
  );
};

export default SupabaseTest;
