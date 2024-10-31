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
        setAuthToken(token);
      }
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const login = async (username, password) => {
    const data = await apiLogin(username, password);
    if (data?.access_token) {
      await AsyncStorage.setItem('token', data.access_token);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);

      setUserToken(data.access_token);
      setAuthToken(data.access_token); // Set token for Axios
    }
  };

  const logout = async () => {
    await apiLogout();
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
    setUserToken(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
