import PlaylistScreen from '@/components/screens/PlaylistScreen';
import { AudioListProvider } from '@/contexts/AudioListContext';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Playlist() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AudioListProvider>
        <PlaylistScreen></PlaylistScreen>
      </AudioListProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
