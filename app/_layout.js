import { View, Text, Keyboard } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import AppContextProvider from '../context/AppContextProvider'
import { Ionicons } from '@expo/vector-icons'
import { colors, styles } from '../data/styles'
import { TouchableOpacity } from 'react-native-ui-lib'

const Layout = () => {
  const router = useRouter()
  return (
    <AppContextProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(authentication)/signIn"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(authentication)/signUp"
          options={{
            presentation: 'modal',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(authentication)/chooseAccount"
          options={{
            presentation: 'modal',
            headerTitle: 'Choose your Account',
            headerTitleStyle: {
              fontFamily: styles.text3,
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerTitle: 'Settings',
            headerTitleStyle: {
              fontFamily: styles.text3,
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="scrapPicker"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="loading"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AppContextProvider>
  )
}

export default Layout