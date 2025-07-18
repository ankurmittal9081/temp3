import React, { useEffect, useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthContext, { useAuth } from './context/AuthContext';
import { setupInterceptors } from './api/axiosConfig';

// Layout & Pages
import AppLayout from './components/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';
import NotFoundPage from './pages/NotFoundPage';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  // We don't need isLoading check here anymore because AuthProvider handles it
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
    const { user } = useAuth();
    return user?.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

function App() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    // This is crucial. It gives the interceptor access to the logout function.
    setupInterceptors(logout);
  }, [logout]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<AppLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPanelPage />} />
          </Route>

          {/* Redirect from root to dashboard if logged in */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default App;