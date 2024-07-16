import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ScreenBackgroundProps {
  children: ReactNode;
}

const ScreenBackground: React.FC<ScreenBackgroundProps> = ({ children }) => {
  return (
    <LinearGradient colors={['#000000B8', '#000000E5']} style={styles.background}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenBackground;
