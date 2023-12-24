// /app/(tabs)/profile/_layout.js

import { Stack } from "expo-router";
import { options } from '../../../../data/styles'

export default function ProfileLayout() {
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
        name='[author]'
        options={{
          ...options,
          headerTitle: 'Profile',
        }}
      />
    </Stack>
  )
}