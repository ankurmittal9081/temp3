import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import request from '../api/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await request('/auth/status');
      if (data.loggedIn) {
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (credentials) => {
    const data = await request('/auth/login', 'POST', credentials);
    await checkAuthStatus();
    navigate(data.role === 'admin' ? '/admin' : '/dashboard');
    return data;
  };

  const register = async (userData) => {
    const data = await request('/auth/register', 'POST', userData);
    await checkAuthStatus();
    navigate(data.role === 'admin' ? '/admin' : '/dashboard');
    return data;
  };

  const logout = async () => {
    await request('/auth/logout', 'POST');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login');
  };

  const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};