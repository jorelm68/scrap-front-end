// /app/(tabs)/feed/_layout.js

import { Stack } from "expo-router";
import { options } from '../../../data/styles'

export default function FeedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          ...options,
          headerTitle: 'Feed',
        }}
      />
      <Stack.Screen
        name='actions'
        options={{
          ...options,
          headerTitle: 'Actions',
        }}
      />
      <Stack.Screen
        name='author'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='book'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )}