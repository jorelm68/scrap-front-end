// /app/(tabs)/library/_layout.js

import { Stack } from "expo-router";
import { options } from '../../../data/styles'

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          ...options,
          headerTitle: 'Library',
        }}
      />
      <Stack.Screen
        name='books'
        options={{
          ...options,
          headerTitle: 'Books',
        }}
      />
    </Stack>
  )}