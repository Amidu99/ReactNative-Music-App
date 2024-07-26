import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AudioFile {
  id: string;
  uri: any;
  filename: string;
}

interface FavoritesContextProps {
  favoriteSongs: AudioFile[];
  toggleFavorite: (song: AudioFile) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

interface FavouriteListProviderProps {
  children: ReactNode;
}

const FAVORITES_STORAGE_KEY = 'favoriteSongs';

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<FavouriteListProviderProps> = ({ children }) => {
  const [favoriteSongs, setFavoriteSongs] = useState<AudioFile[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
          setFavoriteSongs(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorite songs from AsyncStorage:', error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteSongs));
      } catch (error) {
        console.error('Failed to save favorite songs to AsyncStorage:', error);
      }
    };

    saveFavorites();
  }, [favoriteSongs]);

  const toggleFavorite = (song: AudioFile) => {
    setFavoriteSongs((prevFavorites) => {
      const isFavorite = prevFavorites.some(favSong => favSong.id === song.id);
      if (isFavorite) {
        return prevFavorites.filter(favSong => favSong.id !== song.id);
      } else {
        return [...prevFavorites, song];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favoriteSongs, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
