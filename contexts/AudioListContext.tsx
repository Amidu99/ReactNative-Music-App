import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AudioListContextProps {
  currentlyPlaying: string | null;
  setCurrentlyPlaying: (id: string | null) => void;
}

interface AudioListProviderProps {
  children: ReactNode;
}

const AudioListContext = createContext<AudioListContextProps | undefined>(undefined);

export const AudioListProvider: React.FC<AudioListProviderProps> = ({ children }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  return (
    <AudioListContext.Provider value={{ currentlyPlaying, setCurrentlyPlaying }}>
      {children}
    </AudioListContext.Provider>
  );
};

export const useAudioList = () => {
  const context = useContext(AudioListContext);
  if (!context) {
    throw new Error('useAudioList must be used within an AudioListProvider');
  }
  return context;
};
