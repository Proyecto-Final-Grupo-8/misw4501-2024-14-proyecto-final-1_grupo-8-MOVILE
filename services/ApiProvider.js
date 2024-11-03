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

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await reLoginWithStoredCredentials();
      if (newToken) {
        await AsyncStorage.setItem('token', newToken);
        setAuthToken(newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
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
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
    setAuthToken(null);
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const reLoginWithStoredCredentials = async () => {
  try {
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');

    if (username && password) {
      const data = await apiLogin(username, password);
      return data.access_token;
    } else {
      console.error('Stored credentials not found');
      return null;
    }
  } catch (error) {
    console.error('Error re-authenticating with stored credentials:', error);
    return null;
  }
};

// Function to fetch user from the API
// Fetch all incidents

export const fetchUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const updateUser = async (userId, body) => {
  try {
    const response = await api.put(`/user/${userId}`, body );
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Function to fetch incidents from the API
// Fetch all incidents
export const fetchIncidents = async () => {
  try {
    const response = await api.get('/incidents');
    return response.data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
    throw error;
  }
};

// Add a new incident
export const addIncident = async (description, source = "app") => {
  try {
    const response = await api.post('/incident', { description, source });
    return response.data;
  } catch (error) {
    console.error('Error adding incident (ApiProvider):', error);
    throw error;
  }
};

// Get an incident by ID
export const getIncident = async (incidentId) => {
  try {
    const response = await api.get(`/incident/${incidentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an incident
export const updateIncident = async (incidentId, description) => {
  try {
    const response = await api.put(`/incident/${incidentId}`, { description });
    return response.data;
  } catch (error) {
    console.error('Error updating incident:', error);
    throw error;
  }
};

// Delete an incident
export const deleteIncident = async (incidentId) => {
  try {
    const response = await api.delete(`/incident/${incidentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting incident:', error);
    throw error;
  }
};

// Incident Log Management

// Add a log to an incident
export const addLogToIncident = async (incidentId, details) => {
  try {
    const response = await api.post(`/incident/${incidentId}/logs`, { details });
    return response.data;
  } catch (error) {
    console.error('Error adding log to incident:', error);
    throw error;
  }
};

// Get logs for an incident
export const getLogsByIncident = async (incidentId) => {
  try {
    const response = await api.get(`/incident/${incidentId}/logs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching logs for incident:', error);
    throw error;
  }
};

// Get a specific log by ID
export const getLog = async (incidentId, logId) => {
  try {
    const response = await api.get(`/incident/${incidentId}/logs/${logId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching log:', error);
    throw error;
  }
};

// Update a log
export const updateLog = async (incidentId, logId, details) => {
  try {
    const response = await api.put(`/incident/${incidentId}/logs/${logId}`, { details });
    return response.data;
  } catch (error) {
    console.error('Error updating log:', error);
    throw error;
  }
};


export default api;
