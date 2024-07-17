import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Audio } from 'expo-av';

interface AudioFile {
  id: string;
  uri: string;
  filename: string;
  // metadata fields ++
}

interface AudioListContextProps {
  currentlyPlaying: AudioFile | null;
  setCurrentlyPlaying: (file: AudioFile | null) => void;
  playbackObject: Audio.Sound | null;
  setPlaybackObject: (playback: Audio.Sound | null) => void;
}

interface AudioListProviderProps {
  children: ReactNode;
}

const AudioListContext = createContext<AudioListContextProps | undefined>(undefined);

export const AudioListProvider: React.FC<AudioListProviderProps> = ({ children }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<AudioFile | null>(null);
  const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(null);

  return (
    <AudioListContext.Provider value={{ currentlyPlaying, setCurrentlyPlaying, playbackObject, setPlaybackObject }}>
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
