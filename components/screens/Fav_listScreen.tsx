import React from 'react';
import { Image, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useAudioList } from '../../contexts/AudioListContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import ScreenBackground from '../screenComponents/ScreenBackground';
import FavListNavBar from '../screenComponents/FavListNavBar';

interface AudioFile {
  id: string;
  uri: any;
  filename: string;
}

const audioFiles: AudioFile[] = [
  {
    id: '0001',
    filename: 'First Item',
    uri: require('../../assets/Sample-Track.mp3'),
  },
  {
    id: '0002',
    filename: 'Second Item',
    uri: require('../../assets/Sample-Track.mp3'),
  },
  {
    id: '0003',
    filename: 'Third Item',
    uri: require('../../assets/Sample-Track.mp3'),
  },
  {
    id: '0004',
    filename: 'Fourth Item',
    uri: require('../../assets/Sample-Track.mp3'),
  },
  {
    id: '0005',
    filename: 'Fifth Item',
    uri: require('../../assets/Sample-Track.mp3'),
  },
  {
    id: '0006',
    filename: 'Sixth Item',
    uri: require('../../assets/Sample-Track.mp3'),
  },
];


const Fav_listScreen: React.FC = () => {
  const { favoriteSongs } = useFavorites();
  const { currentlyPlaying, setCurrentlyPlaying, playbackObject, setPlaybackObject, setIsPlaying } = useAudioList();

  const playAudio = async (audio: AudioFile) => {
    if (playbackObject) {
      await playbackObject.unloadAsync();
      const { sound } = await Audio.Sound.createAsync({ uri: audio.uri });
      setCurrentlyPlaying(audio);
      setPlaybackObject(sound);
      await sound.playAsync();
      setIsPlaying(true);
    }
  };
  
    const defaultCover = require('../../assets/images/App-logo.png');
    const defaultArtist = 'Unknown Artist';
  
    return (
      <ScreenBackground>
        <FavListNavBar />
        <View style={styles.listContainer}>
          <FlatList
            data={favoriteSongs}
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
  };
  
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

  export default Fav_listScreen;
