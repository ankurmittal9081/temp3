import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { setupInterceptors } from './api/axiosConfig';

import AppLayout from './components/AppLayout';
import Spinner from './components/Spinner';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';
import NotFoundPage from './pages/NotFoundPage';

const ProtectedRoute = () => {
const { isAuthenticated, isLoading } = useAuth();
if (isLoading) { return <div className="flex h-screen w-full items-center justify-center bg-slate-900"><Spinner /></div>; }
return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => { /* ... unchanged ... */ };

function App() {
const { logout } = useAuth();

useEffect(() => {
setupInterceptors(logout);
}, [logout]);

return (
<Routes>
{/* Route 1: The standalone Homepage */}
<Route path="/" element={<HomePage />} />
<Route element={<AppLayout />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    
    <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPanelPage />} />
        </Route>
    </Route>
  </Route>

  <Route path="*" element={<NotFoundPage />} />
</Routes>
);
}
export default App;