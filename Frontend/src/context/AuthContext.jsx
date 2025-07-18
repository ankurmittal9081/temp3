import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from '../api/axios';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // This function is still crucial for verifying the session when a user
  // first visits the site or returns after closing the browser.
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

  // The final, corrected login function
  const login = async (credentials) => {
    try {
      const { data } = await axios.post('/auth/login', credentials);
      setUser(data.user);
      setIsLoggedIn(true);
      
      const targetPath = data.user.role === 'admin' ? '/#/admin' : '/#/dashboard';
      window.location.href = targetPath; // Use hash-based path
      
      return data;
    } catch (error) {
        throw error;
    }
  };

  const register = async (userData) => {
    const { data } = await axios.post('/auth/register', userData);
    await checkAuthStatus(); 
    const targetPath = data.role === 'admin' ? '/#/admin' : '/#/dashboard';
    window.location.href = targetPath; // Use hash-based path
    return data;
  };
  
  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = '/#/login'; // Use hash-based path
  };

  const value = { user, isLoggedIn, isLoading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};