import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL || 'https://velvet-eact-backend.onrender.com';

const PUBLIC_ENDPOINTS = ['/register/', '/login/', '/token/refresh/'];

const api = axios.create({
  baseURL: `${API_URL}/api`
});

api.interceptors.request.use(config => {
  const isPublic = PUBLIC_ENDPOINTS.some(ep => config.url?.includes(ep));
  if (!isPublic) {
    const token = Cookies.get('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      Cookies.remove('access');
      Cookies.remove('refresh');
    }
    return Promise.reject(error);
  }
);

export default api;
