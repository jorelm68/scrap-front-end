import { Tabs, router } from "expo-router"
import { Ionicons } from '@expo/vector-icons'
import { options } from '../../data/styles'
import { useContext, useEffect } from "react"
import AppContext from "../../context/AppContext"
import utility from '../../data/utility'
import cache from '../../data/cache'

const Layout = () => {
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

export default Layout