import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse } from '../../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

// Request interceptor to attach Keycloak JWT token and dev role headers
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const activeRole = typeof localStorage !== 'undefined' ? localStorage.getItem('shreenil_active_role') || 'student' : 'student';
    if (config.headers) {
      if (activeRole === 'teacher') {
        config.headers['X-Dev-Role'] = 'TEACHER';
        config.headers['X-Dev-User-Id'] = 'usr-faculty-elena';
      } else {
        config.headers['X-Dev-Role'] = 'STUDENT';
        config.headers['X-Dev-User-Id'] = 'usr-student-aarav';
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle global error codes and unwrapping
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      console.warn('Unauthorized request - session expired or token invalid');
    }

    return Promise.reject(new Error(message));
  }
);
