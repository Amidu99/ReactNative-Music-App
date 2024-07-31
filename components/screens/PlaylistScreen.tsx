import React, { useState, useEffect } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
import { useAudioList } from '../../contexts/AudioListContext';
import ScreenBackground from '../screenComponents/ScreenBackground';
import PlayListNavBar from '../screenComponents/PlayListNavBar';

interface AudioFile {
  id: string;
  uri: string;
  filename: string;
}

export default function PlaylistScreen() {
  const { audioFiles, setAudioFiles, currentlyPlaying, setCurrentlyPlaying, playbackObject, setPlaybackObject, setIsPlaying } = useAudioList();

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
        setAudioFiles(media.assets as AudioFile[]);
      }
    })();
  }, []);

  const playAudio = async (item: AudioFile) => {
    try {
      if (playbackObject !== null) {
        await playbackObject.unloadAsync();
      }
      const playbackObj = new Audio.Sound();
      await playbackObj.loadAsync({ uri: item.uri });
      await playbackObj.playAsync();
      setPlaybackObject(playbackObj);
      setCurrentlyPlaying(item);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const defaultCover = require('../../assets/images/App-logo.png');
  const defaultArtist = 'Unknown Artist';

  return (
    <ScreenBackground>
      <PlayListNavBar />
      <View style={styles.listContainer}>
        <FlatList
          data={audioFiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isPlaying = currentlyPlaying?.id === item.id;
            return (
              <TouchableOpacity style={styles.item} onPress={() => playAudio(item)}>
                <Image source={defaultCover} style={styles.cover} />
                <View style={styles.info}>
                  <Text style={[styles.fileName, isPlaying && styles.playingText]}>{item.filename}</Text>
                  <Text style={styles.artist}>{defaultArtist}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 75,
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  fileName: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: '#fff',
  },
  artist: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#8E8E8E',
  },
  playingText: {
    color: '#FDC70F',
  },
});
