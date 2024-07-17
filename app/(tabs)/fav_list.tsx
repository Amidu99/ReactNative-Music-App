import { StyleSheet } from 'react-native';
import Fav_listScreen from '@/components/screens/Fav_listScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Fav_list() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Fav_listScreen></Fav_listScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
