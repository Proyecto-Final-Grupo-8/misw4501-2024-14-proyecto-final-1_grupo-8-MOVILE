import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://backend-781163639586.us-central1.run.app/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el token expiró y la respuesta es 401, intenta hacer el refresh
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const newToken = await getNewAccessToken();
    //   if (newToken) {
    //     await AsyncStorage.setItem('token', newToken);
    //     api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    //     originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
    //     return api(originalRequest); // Reintenta la petición original con el nuevo token
    //   }
    // }

    return Promise.reject(error);
  }
);
 

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
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken'); // Si usas refresh token
    const response = await api.post('/refresh-token', { token: refreshToken });
    return response.data.token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

export default api;
