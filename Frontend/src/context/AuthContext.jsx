import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from '../api/axios';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { checkAuthStatus(); }, [checkAuthStatus]);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post('/auth/login', credentials);
      setUser(data.user);
      setIsLoggedIn(true);
      // Change the path to use a hash
      const targetPath = data.user.role === 'admin' ? '/#/admin' : '/#/dashboard';
      window.location.href = targetPath;
    } catch (error) {
      throw error;
    }
  };
  
  const register = async (userData) => {
    try {
      const { data } = await axios.post('/auth/register', userData);
      setUser(data.user);
      setIsLoggedIn(true);
      // Change the path to use a hash
      const targetPath = data.user.role === 'admin' ? '/#/admin' : '/#/dashboard';
      window.location.href = targetPath;
    } catch (error) {
      throw error;
    }
  };
  
  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
    setIsLoggedIn(false);
    // Change the path to use a hash
    window.location.href = '/#/login';
  };

  const value = { user, isLoggedIn, isLoading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};