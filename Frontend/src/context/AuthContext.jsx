import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from '../api/axios';
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
      const { data } = await axios.get('/auth/status');
      if (data.loggedIn) {
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('Auth status check failed:', error.message);
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
    const { data } = await axios.post('/auth/login', credentials);
    await checkAuthStatus();
    navigate(data.role === 'admin' ? '/admin' : '/dashboard');
    return data;
  };

  const register = async (userData) => {
    const { data } = await axios.post('/auth/register', userData);
    await checkAuthStatus();
    navigate(data.role === 'admin' ? '/admin' : '/dashboard');
    return data;
  };

  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login');
  };

  const value = { user, isLoggedIn, isLoading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};