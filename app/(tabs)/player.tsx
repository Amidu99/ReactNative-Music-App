import { View, Text, StyleSheet } from 'react-native';

export default function Player() {
  return (
    <View style={styles.container}>
      <Text>Player</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
