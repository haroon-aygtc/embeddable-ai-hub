import axios from 'axios';
import { toast } from 'sonner';

export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.aichathub.com/api'
  : 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Add request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
    
    // Handle specific error cases
    if (statusCode === 401) {
      // Unauthorized, redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (statusCode === 403) {
      // Forbidden
      toast.error('You do not have permission to perform this action');
    } else if (statusCode === 404) {
      // Not found
      toast.error('Resource not found');
    } else if (statusCode === 422) {
      // Validation errors
      const validationErrors = error.response?.data?.errors;
      if (validationErrors) {
        Object.values(validationErrors).forEach((messages: any) => {
          if (Array.isArray(messages)) {
            messages.forEach(message => toast.error(message));
          }
        });
      } else {
        toast.error(errorMessage || 'Validation failed');
      }
    } else if (statusCode >= 500) {
      // Server errors
      toast.error('Server error. Please try again later.');
      console.error('Server error:', error);
    } else {
      // Other errors
      toast.error(errorMessage || 'An unexpected error occurred');
      console.error('API error:', error);
    }
    
    // Network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
