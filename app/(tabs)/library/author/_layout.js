// /app/(tabs)/profile/_layout.js

import { Stack } from "expo-router";
import { options } from '../../../../data/styles'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='settings'
        options={{
          ...options,
          headerTitle: 'Settings',
        }}
      />
      <Stack.Screen
        name='chooseScraps'
        options={{
          ...options,
          presentation: 'modal',
          headerTitle: 'Choose Scraps',
        }}
      />
      <Stack.Screen
        name='[author]'
        options={{
          ...options,
          headerTitle: 'Profile',
        }}
      />
    </Stack>
  )
}

export default Layout