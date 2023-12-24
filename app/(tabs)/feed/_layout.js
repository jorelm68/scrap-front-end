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
    </Stack>
  )}