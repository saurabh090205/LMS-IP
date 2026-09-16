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

// Request interceptor to attach Keycloak JWT token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent response data extraction and error normalization
apiClient.interceptors.response.use(
  (response) => {
    // If backend returns { success: true, data: ... }, extract data or return payload
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response;
    }
    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response) {
      const serverError = error.response.data;
      const normalizedMessage = serverError?.message || error.message || 'An unexpected server error occurred';
      return Promise.reject(new Error(normalizedMessage));
    } else if (error.request) {
      return Promise.reject(new Error('Unable to connect to Shreenil server. Please check your network.'));
    }
    return Promise.reject(error);
  }
);
