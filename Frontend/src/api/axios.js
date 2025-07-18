import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// The interceptor can remain the same. It's good practice.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unknown error occurred';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.request) {
      errorMessage = 'No response from server. Check network connection.';
    } else {
      errorMessage = error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;