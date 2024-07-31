import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Audio } from 'expo-av';

interface AudioFile {
  id: string;
  uri: string;
  filename: string;
}

interface AudioListContextData {
  audioFiles: AudioFile[];
  setAudioFiles: (files: AudioFile[]) => void;
  currentlyPlaying: AudioFile | null;
  setCurrentlyPlaying: (file: AudioFile) => void;
  playbackObject: Audio.Sound | null;
  setPlaybackObject: (sound: Audio.Sound) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  playPrevious: () => void;
  playNext: () => void;
}

const AudioListContext = createContext<AudioListContextData>({} as AudioListContextData);

export const useAudioList = () => useContext(AudioListContext);

export const AudioListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<AudioFile | null>(null);
  const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const playAudio = async (index: number) => {
    try {
      if (playbackObject !== null) {
        await playbackObject.unloadAsync();
      }
      const playbackObj = new Audio.Sound();
      await playbackObj.loadAsync({ uri: audioFiles[index].uri });
      await playbackObj.playAsync();
      setPlaybackObject(playbackObj);
      setCurrentlyPlaying(audioFiles[index]);
      setCurrentIndex(index);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const playPrevious = () => {
    if (currentIndex > 0) {
      playAudio(currentIndex - 1);
    }
  };

  const playNext = () => {
    if (currentIndex < audioFiles.length - 1) {
      playAudio(currentIndex + 1);
    }
  };

  return (
    <AudioListContext.Provider
      value={{
        audioFiles,
        setAudioFiles,
        currentlyPlaying,
        setCurrentlyPlaying,
        playbackObject,
        setPlaybackObject,
        isPlaying,
        setIsPlaying,
        playPrevious,
        playNext,
      }}
    >
      {children}
    </AudioListContext.Provider>
  );
};
