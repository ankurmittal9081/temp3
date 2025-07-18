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
      if (data.loggedIn) { setUser(data.user); setIsLoggedIn(true); } 
      else { setUser(null); setIsLoggedIn(false); }
    } catch (error) {
      setUser(null); setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { checkAuthStatus(); }, [checkAuthStatus]);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post('/login', credentials);
      setUser(data.user);
      setIsLoggedIn(true);
      const targetPath = data.user.role === 'admin' ? '/admin' : '/dashboard';
      navigate(targetPath);
    } catch (error) { throw error; }
  };
  
  const register = async (userData) => {
    const { data } = await axios.post('/register', userData);
    setUser(data.user);
    setIsLoggedIn(true);
    const targetPath = data.user.role === 'admin' ? '/admin' : '/dashboard';
    navigate(targetPath);
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