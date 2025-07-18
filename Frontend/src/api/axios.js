import axios from 'axios';
const API_BASE_URL = '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'An unknown error occurred';
    if (error.response) {
      errorMessage = error.response.data.message || 'Error from server';
    } else if (error.request) {
      errorMessage = 'No response from server. Check network or CORS.';
    } else {
      errorMessage = error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;