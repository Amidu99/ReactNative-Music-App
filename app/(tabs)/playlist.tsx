import PlaylistScreen from '@/components/screens/PlaylistScreen';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Playlist() {
  return (
    <SafeAreaView style={styles.safeArea}>
        <PlaylistScreen></PlaylistScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
