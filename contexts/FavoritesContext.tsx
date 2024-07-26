import React, { createContext, useState, useContext, ReactNode } from 'react';

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

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<FavouriteListProviderProps> = ({ children }) => {
  const [favoriteSongs, setFavoriteSongs] = useState<AudioFile[]>([]);

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
