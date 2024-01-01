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
        name="offlineCamera"
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
        name="offlineScraps"
        options={{
          ...options,
          tabBarLabel: "Scraps",
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Ionicons name={focused ? 'image' : 'image-outline'} size={size} color={color} />
            )
          }
        }}
      />
    </Tabs>
  );
}

export default Layout