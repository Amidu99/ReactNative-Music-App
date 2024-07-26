import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';
import { useAudioList } from '@/contexts/AudioListContext';

const Player: React.FC = () => {
  const { currentlyPlaying, playbackObject, isPlaying, setIsPlaying } = useAudioList();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [albumArt, setAlbumArt] = useState<any>(require('../../assets/images/App-logo.png'));
  const rotation = useRef(new Animated.Value(0)).current;
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatusSuccess | null>(null);

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPlaybackStatus(status as AVPlaybackStatusSuccess);
      setCurrentTime(status.positionMillis / 1000);

      if (status.durationMillis !== undefined) {
        setDuration(status.durationMillis / 1000);
      }

      if (status.didJustFinish && !status.isLooping) {
        setIsPlaying(false);
        stopRotation();
      }
    }
  }, [setIsPlaying]);

  useEffect(() => {
    if (playbackObject) {
      playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
  }, [playbackObject, onPlaybackStatusUpdate]);

  useEffect(() => {
    if (isPlaying) {
      startRotation();
    } else {
      stopRotation();
    }
  }, [isPlaying]);

  const startRotation = () => {
    rotation.setValue(0);
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: duration * 500,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopRotation = () => {
    rotation.stopAnimation();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayPause = async () => {
    if (playbackObject) {
      if (isPlaying) {
        await playbackObject.pauseAsync();
      } else {
        await playbackObject.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#000000B8', '#000000E5']}
        style={styles.background}
      >
        <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <FontAwesome size={24} name="arrow-left" color={'#8E8E8E'} />
          </TouchableOpacity>
          <Text style={styles.songTitle}>
            {currentlyPlaying?.filename 
              ? (currentlyPlaying.filename.length > 20 
                ? currentlyPlaying.filename.substring(0, 20) + '...' 
                : currentlyPlaying.filename)
            : 'Unknown'}
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <FontAwesome size={24} name="bars" color={'#8E8E8E'} />
          </TouchableOpacity>
        </View>
        <Animated.Image
          style={[
            styles.logo,
            {
              transform: [
                {
                  rotate: rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
          source={albumArt}
        />
        <View style={styles.trackDetailContainer}>
          <Text style={styles.title}>
            {currentlyPlaying?.filename 
              ? (currentlyPlaying.filename.length > 50 
                ? currentlyPlaying.filename.substring(0, 50) + '...' 
                : currentlyPlaying.filename)
            : 'Unknown'}
          </Text>
          <Text style={styles.artist}>Unknown Artist</Text>
        </View>
        <View style={styles.playingBarContainer}>
          <Slider
            style={styles.slider}
            value={currentTime}
            minimumValue={0}
            maximumValue={duration}
            onValueChange={(value) => setCurrentTime(value)}
            minimumTrackTintColor="#FDC70F"
            maximumTrackTintColor="#fff"
            thumbTintColor="#FDC70F"
            step={1}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
          <View style={styles.controlButtonsContainer}>
            <TouchableOpacity style={styles.controlButton} onPress={() => {/* Previous action */}}>
              <FontAwesome name="backward" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, styles.colorButton]} onPress={togglePlayPause}>
              <FontAwesome name={isPlaying ? "pause" : "play"} size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={() => {/* Next action */}}>
              <FontAwesome name="forward" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  trackDetailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 280,
    height: 280,
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  songTitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
  },
  playingBarContainer: {
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
  },
  slider: {
    height: 20,
    width: '100%',
  },
  controlButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  controlButton: {
    padding: 10,
  },
  colorButton: {
    backgroundColor: '#FDC70F',
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FDC70F',
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 50,
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 6,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeText: {
    color: '#FDC70F',
    fontFamily: 'Nunito-Regular',
  },
  title: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 5,
  },
  artist: {
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    color: '#8E8E8E',
    textAlign: 'center',
    marginHorizontal: 5,
  },
});

export default Player;
