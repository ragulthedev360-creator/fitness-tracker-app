import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/store/auth';
import RootNavigator from './src/navigation';
import Toast from 'react-native-toast-message';
import { TostConfig } from './src/screens/components/toastMsg';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
          <Toast config={TostConfig} />
      </NavigationContainer>
    </AuthProvider>
  );
}
