import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../context/SupabaseContext';

const UserProfile: React.FC = () => {
  const { user, signOut, loading } = useSupabase();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Your Profile</h2>
      <div className="mb-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
      </div>
      <button
        onClick={handleSignOut}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile;
