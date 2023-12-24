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
        }}
      />
    </Stack>
  )}