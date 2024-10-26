import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLogin, apiLogout, getNewAccessToken, setAuthToken } from '../services/ApiProvider'; // Import setAuthToken

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setUserToken(token);
        setAuthToken(token); // Make sure Axios has the token
      }
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const login = async (username, password) => {
    const data = await apiLogin(username, password);
    if (data?.token) {
      await AsyncStorage.setItem('token', data.token);
      setUserToken(data.token);
      setAuthToken(data.token); // Set token for Axios
    }
  };

  const logout = async () => {
    await apiLogout();
    await AsyncStorage.removeItem('token');
    setUserToken(null);
    setAuthToken(null); // Remove token from Axios
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
