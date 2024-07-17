import React, { ReactNode } from 'react';
import { AudioListProvider } from '@/contexts/AudioListContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AudioListProvider>
      <SafeAreaProvider>
        {children}
      </SafeAreaProvider>
    </AudioListProvider>
  );
};

export default AppProvider;
