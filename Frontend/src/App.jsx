import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
// --- THE FIX IS HERE (PART 2) ---
// Import 'useAuth' as a named export from its correct location.
import { useAuth } from './context/AuthContext';
import { setupInterceptors } from './api/axiosConfig';

// Layout and Component Imports
import AppLayout from './components/AppLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import Spinner from './components/Spinner';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center bg-slate-900"><Spinner /></div>;
  }
  // The layout is now INSIDE the protected route, ensuring it only shows when authenticated.
  return isAuthenticated ? <AppLayout><Outlet /></AppLayout> : <Navigate to="/login" replace />;
};

// This component is for pages like Login/Register, so logged-in users are redirected away.
const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return <div className="flex h-screen w-full items-center justify-center bg-slate-900"><Spinner /></div>;
    }
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const AdminRoute = () => {
    const { user } = useAuth();
    return user?.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

function App() {
  const { logout } = useAuth();
  
  useEffect(() => {
    setupInterceptors(logout);
  }, [logout]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Public routes like login and register are now separate */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      
      {/* All authenticated pages live within this route */}
      <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPanelPage />} />
          </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;