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
      <Stack.Screen
        name='chooseBooks'
        options={{
          ...options,
          presentation: 'modal',
          headerTitle: 'Choose Books',
        }}
      />
      <Stack.Screen
        name='createBook'
        options={{
          ...options,
          presentation: 'modal',
          headerTitle: 'Create Book',
        }}
      />
      <Stack.Screen
        name='scraps'
        options={{
          ...options,
          headerTitle: 'Scraps',
        }}
      />
      <Stack.Screen
        name='book'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='profile'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )}