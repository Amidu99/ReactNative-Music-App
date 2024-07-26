import { router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const FavListNavBar = () => {
  return(
    <View style={styles.titleContainer}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('player')}>
        <FontAwesome size={24} name="arrow-left" color={'#8E8E8E'} />
      </TouchableOpacity>
      <Text style={styles.title}>Favourite List</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <FontAwesome size={24} name="bars" color={'#8E8E8E'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  button: {
    padding: 10,
  },
  });

export default FavListNavBar;
