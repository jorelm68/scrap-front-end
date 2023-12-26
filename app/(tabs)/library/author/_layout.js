// /app/(tabs)/profile/_layout.js

import { Stack, router } from "expo-router";
import { options } from '../../../../data/styles'
import { Ionicons } from '@expo/vector-icons'
import { useContext } from "react";
import AppContext from "../../../../context/AppContext";
import { TouchableOpacity } from 'react-native-ui-lib'

const Layout = () => {
  const { palette } = useContext(AppContext)
  return (
    <Stack>
      <Stack.Screen
        name='settings'
        options={{
          ...options,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => {
                router.back()
              }}>
                <Ionicons name='close-circle' color={palette.color6} size={24} />
              </TouchableOpacity>
            )
          },
          presentation: 'modal',
          headerTitle: 'Settings',
        }}
      />
      <Stack.Screen
        name='chooseScraps'
        options={{
          ...options,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => {
                router.back()
              }}>
                <Ionicons name='close-circle' color={palette.color6} size={24} />
              </TouchableOpacity>
            )
          },
          presentation: 'modal',
          headerTitle: 'Choose Scraps',
        }}
      />
      <Stack.Screen
        name='[author]'
        options={{
          ...options,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => {
                router.back()
              }}>
                <Ionicons name='chevron-back' color={palette.color6} size={24} />
              </TouchableOpacity>
            )
          },
          headerTitle: 'Profile',
        }}
      />
    </Stack>
  )
}

export default Layout