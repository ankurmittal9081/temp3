import axios from 'axios';

const API_BASE_URL = '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unknown error occurred';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.request) {
      errorMessage = 'No response from server. Check network connection or server status.';
    } else {
      errorMessage = error.message;
    }
    console.error("Axios Interceptor Error:", errorMessage, error);
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;