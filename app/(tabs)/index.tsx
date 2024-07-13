import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import AppLoadingScreen from '@/components/screens/AppLoading';
import { router } from 'expo-router';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  
  const loadFonts = async () => {
    try {
        await Font.loadAsync({
            'RubikWetPaint-Regular': require('../../assets/fonts/RubikWetPaint-Regular.ttf'),
            'Nosifer-Regular': require('../../assets/fonts/Nosifer-Regular.ttf'),
        });
        setFontsLoaded(true);
    } catch (error) {
        console.error("Error loading fonts:", error);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoadingScreen message="Loading..." />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000B8', '#000000E5']}
        style={styles.background}
      >
        <View style={styles.textWithStrokeContainer}>
          <Text style={[styles.headerText, styles.textStroke]}>A$ Music Player</Text>
          <Text style={styles.headerText}>A$ Music Player</Text>
        </View>
        <Image
          style={styles.logo}
          source={require('../../assets/images/App-logo.png')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Experience the</Text>
          <Text style={styles.welcomeText}>magic of melodies</Text>
          <Text style={styles.welcomeText}>that speak directly</Text>
          <Text style={styles.welcomeText}>to your soul.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => router.push('player')}>
          <Text style={styles.buttonText}>LET'S PLAY</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 280,
    height: 280,
    marginTop:50,
  },
  welcomeText: {
    fontFamily: 'Nosifer-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#FDC70F',
  },
  textWithStrokeContainer: {
    position: 'relative',
  },
  headerText: {
    fontFamily: 'RubikWetPaint-Regular',
    fontSize: 32,
    color: '#FDC70F',
  },
  textStroke: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: 1,
    bottom: 1,
    color: 'black',
  },
  button: {
    backgroundColor: '#FDC70F',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
  },
});

export default App;
