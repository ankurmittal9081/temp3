import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => error ? prom.reject(error) : prom.resolve(token));
    failedQueue = [];
};

export const setupInterceptors = (logoutCallback) => {
    apiClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
                        .then(() => apiClient(originalRequest));
                }
                originalRequest._retry = true;
                isRefreshing = true;
                try {
                    await apiClient.post('/auth/refresh-token');
                    processQueue(null);
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError);
                    console.error("Session expired, logging out.", refreshError);
                    logoutCallback(); // Call the logout function from context
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
            // For non-401 errors, just pass them along.
            return Promise.reject(error.response?.data || error);
        }
    );
};

export default apiClient;