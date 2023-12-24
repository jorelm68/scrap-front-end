// /app/(tabs)/camera/_layout.js

import { Stack } from "expo-router";
import { options } from '../../../data/styles'

export default function CameraLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          ...options,
          headerTitle: 'Camera',
        }}
      />
    </Stack>
  )
}