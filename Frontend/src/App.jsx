import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { setupInterceptors } from './api/axiosConfig';

import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';
import NotFoundPage from './pages/NotFoundPage';
import Spinner from './components/Spinner';

// This wrapper protects routes that require a logged-in user
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) { return <div className="h-screen w-full flex items-center justify-center"><Spinner /></div>; }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// This wrapper protects routes that require an admin role
const AdminRoute = () => {
    const { user } = useAuth();
    // This assumes ProtectedRoute has already confirmed authentication
    return user?.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

function App() {
  const { logout } = useAuth();
  useEffect(() => { setupInterceptors(logout); }, [logout]);

  return (
    <Routes>
      {/* Every page in the application is now wrapped by the AppLayout for a consistent look and feel */}
      <Route element={<AppLayout />}>
        
        {/* Publicly accessible routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Authenticated routes are nested inside the ProtectedRoute wrapper */}
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* Admin-only routes are further nested */}
            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPanelPage />} />
            </Route>
        </Route>
        
        {/* The 404 page is also inside the layout for consistency */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
export default App;