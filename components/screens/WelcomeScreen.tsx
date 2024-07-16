import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import WelcomeScreenHeader from '../screenComponents/WelcomeScreenHeader';
import WelcomeText from '../screenComponents/WelcomeText';

const WelcomeScreen = () => {
  return (
    <LinearGradient
        colors={['#000000B8', '#000000E5']}
        style={styles.background}
    >
        <WelcomeScreenHeader></WelcomeScreenHeader>
        <Image
            style={styles.logo}
            source={require('../../assets/images/App-logo.png')}
        />
        <WelcomeText></WelcomeText>
        <TouchableOpacity style={styles.button} onPress={() => router.push('player')}>
            <Text style={styles.buttonText}>LET'S PLAY</Text>
        </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 280,
    height: 280,
    marginTop: 50,
  },
  button: {
    backgroundColor: '#FDC70F',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: '#000000',
  },
});

export default WelcomeScreen;
