import { Tabs, useNavigation } from "expo-router";
import { Ionicons } from '@expo/vector-icons'
import { fonts, options } from '../../data/styles'
import { useContext } from "react";
import { TouchableOpacity } from 'react-native-ui-lib'
import AppContext from "../../context/AppContext";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="feed"
        options={{
          ...options,
          tabBarLabel: "Feed",
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          ...options,
          tabBarLabel: "Search",
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          ...options,
          tabBarLabel: "Camera",
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Ionicons name={focused ? 'camera' : 'camera-outline'} size={size} color={color} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          ...options,
          tabBarLabel: "Library",
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Ionicons name={focused ? 'library' : 'library-outline'} size={size} color={color} />
            )
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          ...options,
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
            )
          }
        }}
      />
    </Tabs>
  );
}