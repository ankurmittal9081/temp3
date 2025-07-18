import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import apiClient from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const logout = useCallback(async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error("Logout API call failed:", error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            navigate('/login', { replace: true });
        }
    }, [navigate]);
    
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await apiClient.get('/auth/current-user');
                if (response.data?.success) {
                    setUser(response.data.data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuthStatus();
    }, []);
    
    const login = async (email, password) => {
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            if (response.data?.success) {
                setUser(response.data.data.user);
                setIsAuthenticated(true);
                const targetPath = response.data.data.user.role === 'admin' ? '/admin' : '/dashboard';
                navigate(targetPath, { replace: true });
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    
    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-900">
                <Spinner />
            </div>
        );
    }

    const value = { user, isAuthenticated, isLoading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};