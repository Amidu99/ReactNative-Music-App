import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Audio } from 'expo-av';

interface AudioFile {
  id: string;
  uri: any;
  filename: string;
}

interface AudioListContextProps {
  currentlyPlaying: AudioFile | null;
  setCurrentlyPlaying: (audio: AudioFile) => void;
  playbackObject: Audio.Sound | null;
  setPlaybackObject: (sound: Audio.Sound) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const AudioListContext = createContext<AudioListContextProps | undefined>(undefined);

interface AudioListProviderProps {
  children: ReactNode;
}

export const AudioListProvider: React.FC<AudioListProviderProps> = ({ children }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<AudioFile | null>(null);
  const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioListContext.Provider
      value={{
        currentlyPlaying,
        setCurrentlyPlaying,
        playbackObject,
        setPlaybackObject,
        isPlaying,
        setIsPlaying,
      }}
    >
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
