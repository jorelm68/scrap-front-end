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
            title: 'Login',
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