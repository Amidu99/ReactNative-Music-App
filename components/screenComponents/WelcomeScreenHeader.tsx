import { View, Text, StyleSheet, } from 'react-native';

const WelcomeScreenHeader = () => {
    return(
        <View style={styles.textWithStrokeContainer}>
            <Text style={[styles.headerText, styles.textStroke]}>A$ Music Player</Text>
            <Text style={styles.headerText}>A$ Music Player</Text>
        </View>
    );
};

const styles = StyleSheet.create({
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
  });

export default WelcomeScreenHeader;
