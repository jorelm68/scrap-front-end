// /app/(tabs)/home/_layout.js

import { Stack } from "expo-router";
import { options } from '../../../data/styles'

export default function SearchLayout() {
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