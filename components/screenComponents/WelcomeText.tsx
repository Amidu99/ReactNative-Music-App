import { Text, StyleSheet, } from 'react-native';

const WelcomeText = () => {
    return(
        <Text style={styles.welcomeText}>Experience the{'\n'}magic of melodies{'\n'}that speak directly{'\n'}to your soul.</Text>
    );
};

const styles = StyleSheet.create({
    welcomeText: {
        fontFamily: 'Nosifer-Regular',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        color: '#FDC70F',
        textAlign: 'center',
        marginTop: 40,
      },
  });

export default WelcomeText;
