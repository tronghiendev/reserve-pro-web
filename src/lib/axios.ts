import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://reserve-pro-api.test/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to automatically attach authorization token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('reserve_pro_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to intercept 401 Unauthorized and clear token
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('reserve_pro_token');
      localStorage.removeItem('reserve_pro_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
