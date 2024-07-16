import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLoadingScreen from '@/components/screens/AppLoading';
import WelcomeScreen from "@/components/screens/WelcomeScreen";

const App: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'RubikWetPaint-Regular': require('../../assets/fonts/RubikWetPaint-Regular.ttf'),
        'Nosifer-Regular': require('../../assets/fonts/Nosifer-Regular.ttf'),
        'Nunito-Regular': require('../../assets/fonts/Nunito-Regular.ttf')
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#000000"
      />
      <WelcomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
