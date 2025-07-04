import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false
});



const PUBLIC_ROUTES = ['/auth/login'];

api.interceptors.request.use(config => {
  const isPublicRoute = PUBLIC_ROUTES.some(route => config.url?.startsWith(route));
  if (isPublicRoute) {
    return config; // Skip auth
  }

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle token expiration or invalid token
      localStorage.removeItem('token');
      //window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default api;