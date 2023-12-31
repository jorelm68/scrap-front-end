// /app/(tabs)/feed/_layout.js

import { Stack, router } from "expo-router";
import { dark, options } from '../../../data/styles'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-ui-lib'

const Layout = () => {  
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
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => {
                router.back()
              }}>
                <Ionicons name='chevron-back' color={dark.color6} size={24} />
              </TouchableOpacity>
            )
          },
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
  )
}

export default Layout