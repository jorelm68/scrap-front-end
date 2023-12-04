import { View, Text, Keyboard } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import AppContextProvider from '../context/AppContextProvider'

const Layout = () => {
  return (
    <AppContextProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(authentication)/signIn"
          options={{ headerShown: false }}
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
            title: 'Choose Account',
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="loading"
          options={{ headerShown: false }}
        />
      </Stack>
    </AppContextProvider>
  )
}

export default Layout