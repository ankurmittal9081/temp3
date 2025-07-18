import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { setupInterceptors } from './api/axiosConfig';

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
  if (isLoading) { return <div className="flex h-screen w-full items-center justify-center bg-slate-900"><Spinner /></div>; }
  return isAuthenticated ? <AppLayout><Outlet /></AppLayout> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) { return <div className="flex h-screen w-full items-center justify-center bg-slate-900"><Spinner /></div>; }
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <AppLayout><Outlet/></AppLayout>
};

const AdminRoute = () => {
    const { user } = useAuth();
    return user?.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

function App() {
  const { logout } = useAuth();
  useEffect(() => { setupInterceptors(logout); }, [logout]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
      </Route>
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