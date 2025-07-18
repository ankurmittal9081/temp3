import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner'; // We'll show a spinner while checking auth

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, isLoading, user } = useAuth();
  const location = useLocation();

  // 1. If the authentication status is still being loaded, show a loading indicator.
  // THIS IS THE CRITICAL FIX. It prevents any redirects until we know
  // for sure if the user is logged in or not.
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // 2. After loading is finished, if the user is NOT logged in, redirect them to the login page.
  if (!isLoggedIn) {
    // Pass the original location they were trying to access in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. After loading is finished, if this is an admin-only route and the user is not an admin,
  // redirect them to their dashboard.
  if (adminOnly && user?.role !== 'admin') {
     return <Navigate to="/dashboard" replace />;
  }

  // 4. If all checks pass, render the child component they intended to visit.
  return children;
};

export default ProtectedRoute;