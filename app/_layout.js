import { View, Text, Keyboard } from 'react-native'
import React, { useContext } from 'react'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { fonts, options } from '../data/styles'
import { TouchableOpacity } from 'react-native-ui-lib'
import AppContext from '../context/AppContext'
import AppContextProvider from '../context/AppContextProvider'

const Layout = () => {
  const { palette } = useContext(AppContext)
  const router = useRouter()
  return (
      <Stack>
        <Stack.Screen 
          name="(tabs)"
          options={{
            ...options,
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="authentication"
          options={{
            ...options,
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="index"
          options={{
            ...options,
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="loading"
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
      </Stack>
  )
}

const App = () => {
  return (
      <AppContextProvider>
          <Layout />
      </AppContextProvider>
  )
}

export default App