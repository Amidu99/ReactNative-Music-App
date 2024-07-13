import { View, Text, StyleSheet } from 'react-native';

export default function Playlist() {
  return (
    <View style={styles.container}>
      <Text>List</Text>
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
