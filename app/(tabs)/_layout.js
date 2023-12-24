import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons'
import { fonts } from '../../data/styles'
import { useContext } from "react";
import AppContext from "../../context/AppContext";

export default function TabsLayout() {
  const { palette } = useContext(AppContext)

  const options = {
    headerTitleStyle: {
      fontFamily: fonts.playBold,
      fontSize: 24,
      color: palette.color7,
    },
    headerStyle: {
      backgroundColor: palette.color0,
    },
    tabBarStyle: {
      backgroundColor: palette.color0,
    },
    tabBarInactiveTintColor: palette.color6,
    tabBarActiveTintColor: palette.accent,
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="feed"
        options={{
          ...options,
          tabBarLabel: "Feed",
          tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />,
          headerTitle: "Feed"
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          ...options,
          tabBarLabel: "Search",
          tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />,
          headerTitle: "Search"
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          ...options,
          tabBarLabel: "Camera",
          tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'camera' : 'camera-outline'} size={size} color={color} />,
          headerTitle: "Camera"
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          ...options,
          tabBarLabel: "Library",
          tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'library' : 'library-outline'} size={size} color={color} />,
          headerTitle: "Library"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          ...options,
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'profile' : 'profile-outline'} size={size} color={color} />,
          headerTitle: "Profile"
        }}
      />
    </Tabs>
  );
}