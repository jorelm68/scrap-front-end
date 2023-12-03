import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import AppContextProvider from '../context/AppContextProvider'

const Layout = () => {
  return (
    <AppContextProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Autothenticate',
          }}
        />
        <Stack.Screen
          name="(authentication)/signIn"
          options={{
            title: 'Sign In',
          }}
        />
        <Stack.Screen
          name="(authentication)/chooseAccount"
          options={{
            title: 'Choose Account',
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </AppContextProvider>
  )
}

export default Layout