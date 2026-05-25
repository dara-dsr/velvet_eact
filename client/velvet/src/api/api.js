import axios from 'axios';

const API_URL = 'https://velvet-eact-backend.onrender.com';

const api = axios.create({
  baseURL: `${API_URL}/api`
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
