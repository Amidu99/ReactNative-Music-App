import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FDC70F',
        tabBarInactiveTintColor: '#8E8E8E',
        tabBarStyle: {
          backgroundColor: '#0A0A05',
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 0,
          paddingTop: 15,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          marginHorizontal: 10,
          position: 'absolute',
          bottom: 0,
          shadowColor: '#FDC70F',
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.2,
          shadowRadius: 40,
          elevation: 15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerTitle: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="player"
        options={{
          title: '',
          headerTitle: 'Player',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="music" color={color} />,
        }}
      />
      <Tabs.Screen
        name="fav_list"
        options={{
          title: '',
          headerTitle: 'Favourite',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="playlist"
        options={{
          title: '',
          headerTitle: 'Playlist',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
