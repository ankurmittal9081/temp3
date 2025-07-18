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
      // Step 1: Call the login endpoint. The browser receives and stores the httpOnly cookie.
      // The response also contains the user's data, which is essential.
      const { data } = await axios.post('/auth/login', credentials);
      
      // Step 2: Set the user state immediately for a good UX.
      setUser(data.user);
      setIsLoggedIn(true);
      
      // Step 3: THE DEFINITIVE FIX - Force a full page reload to the target path.
      // This ensures that when the dashboard page loads, the browser's cookie jar
      // is fully synchronized, and all subsequent API calls will be authenticated.
      const targetPath = data.user.role === 'admin' ? '/admin' : '/dashboard';
      window.location.href = targetPath;
      
      // The return is kept for consistency, though the page will reload before it's used.
      return data;
    } catch (error) {
        // Re-throw the error so the LoginPage's catch block can access it
        // and display the "Invalid credentials" message to the user.
        throw error;
    }
  };

  const register = async (userData) => {
    // For registration, we still want a seamless flow without a hard reload.
    // The server will set the cookie, and we will immediately navigate.
    const { data } = await axios.post('/auth/register', userData);
    await checkAuthStatus();
    // Use window.location here as well for consistency and robustness
    window.location.href = data.role === 'admin' ? '/admin' : '/dashboard';
    return data;
  };
  
  const logout = async () => {
    await axios.post('/auth/logout');
    // For logout, forcing a reload to the login page is also the most reliable method.
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  const value = { user, isLoggedIn, isLoading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};