import React, { useEffect, useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
// --- THE FIX IS HERE ---
// We no longer need the default import. We only import our custom hook.
import { useAuth } from './context/AuthContext';
import { setupInterceptors } from './api/axiosConfig';

// Layout & Pages
import AppLayout from './components/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';
import NotFoundPage from './pages/NotFoundPage';
import Spinner from './components/Spinner';

const ProtectedRoute = () => {
  // We use our custom hook here, as intended.
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-900">
            <Spinner />
        </div>
      );
  }

  return isAuthenticated ? <AppLayout><Outlet /></AppLayout> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
    const { user } = useAuth(); // Also use the custom hook here
    return user?.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

function App() {
  // --- THE FIX IS HERE ---
  // We use our custom hook `useAuth()` to get the context values.
  // This is much cleaner and is the intended pattern.
  const { logout } = useAuth();

  useEffect(() => {
    // This part is correct: pass the logout function to the interceptor setup.
    setupInterceptors(logout);
  }, [logout]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPanelPage />} />
        </Route>

        {/* Redirect from root to dashboard if logged in */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default App;