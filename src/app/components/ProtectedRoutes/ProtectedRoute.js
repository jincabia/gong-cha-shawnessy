// src/app/components/ProtectedRoute.js
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../_utils/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push('/signin'); // Redirect to sign-in if not authenticated
    return null;
  }

  return children;
};

export default ProtectedRoute;
