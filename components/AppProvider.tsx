import React, { ReactNode } from 'react';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { AudioListProvider } from '@/contexts/AudioListContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <FavoritesProvider>
      <AudioListProvider>
        <SafeAreaProvider>
          {children}
        </SafeAreaProvider>
      </AudioListProvider>
    </FavoritesProvider>
  );
};

export default AppProvider;
