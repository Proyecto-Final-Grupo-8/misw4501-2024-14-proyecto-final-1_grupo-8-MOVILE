import './i18n';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nextProvider } from 'react-i18next';
import SignIn from './app/(auth)/sign-in';  
import SignIn from './app/(auth)/TestComponent';  
import Home from './app/(tabs)/home';
import i18n from './i18n';

const Stack = createStackNavigator();

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}