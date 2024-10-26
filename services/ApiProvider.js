import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://backend-781163639586.us-central1.run.app/api';

const api = axios.create({
  baseURL: API_URL,
});

// Function to set Authorization header with the latest token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Request Interceptor to add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor to handle errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token is expired and receives a 401, attempt to refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await getNewAccessToken();
      if (newToken) {
        await AsyncStorage.setItem('token', newToken);
        setAuthToken(newToken); // Update the Axios instance with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest); // Retry the original request with the new token
      }
    }

    return Promise.reject(error);
  }
);

// Authentication Functions
export const apiLogin = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
    throw new Error(errorMessage);
  }
};

export const apiLogout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    setAuthToken(null);
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken'); // If using a refresh token
    const response = await api.post('/refresh-token', { token: refreshToken });
    return response.data.token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

// Function to fetch incidents from the API
export const fetchIncidents = async () => {
  try {
    const response = await api.get('/incidents');
    return response.data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
    throw error;
  }
};



export default api;
