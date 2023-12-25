// /app/(tabs)/profile/_layout.js

import { Stack } from "expo-router";
import { options } from '../../../data/styles'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          ...options,
          headerTitle: 'Profile',
        }}
      />
      <Stack.Screen
        name='book'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='author'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default Layout