// /app/(tabs)/profile/_layout.js

import { Stack } from "expo-router";
import { options } from '../../../data/styles'

export default function ProfileLayout() {
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
        name='profile/settings'
        options={{
          ...options,
          headerTitle: 'Settings',
        }}
      />
      <Stack.Screen
        name='profile/[author]'
        options={{
          ...options,
          headerTitle: 'Profile',
        }}
      />
      <Stack.Screen
        name='book/[book]'
        options={{
          ...options,
          headerTitle: 'Book',
        }}
      />
    </Stack>
  )
}