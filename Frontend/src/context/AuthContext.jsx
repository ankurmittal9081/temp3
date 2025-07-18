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

  // checkAuthStatus is still essential for when the user first loads the app
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

  useEffect(() => { checkAuthStatus(); }, [checkAuthStatus]);

  // --- THE CRITICAL FIX IS HERE ---
  const login = async (credentials) => {
    // 1. Call the login endpoint. It sets the cookie AND returns the user data.
    const { data } = await axios.post('/auth/login', credentials);
    
    // 2. Set the user state DIRECTLY. No need for a second API call.
    setUser(data.user);
    setIsLoggedIn(true);
    
    // 3. Now navigate. The ProtectedRoute will find isLoggedIn === true.
    navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');

    return data;
  };

  // The register function can also be streamlined
  const register = async (userData) => {
    await axios.post('/auth/register', userData);
    // After registering, it's best to re-check status to get the new cookie/session data cleanly.
    await checkAuthStatus(); 
    navigate('/dashboard'); 
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