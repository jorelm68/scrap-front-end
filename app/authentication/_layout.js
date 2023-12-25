import { View, Text, Keyboard } from 'react-native'
import React, { useContext } from 'react'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { fonts, options } from '../../data/styles'
import { TouchableOpacity } from 'react-native-ui-lib'
import AppContext from '../../context/AppContext'
import AppContextProvider from '../../context/AppContextProvider'

const Layout = () => {
  const { palette } = useContext(AppContext)
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen
        name="signIn"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          ...options,
          presentation: 'modal',
          headerTitle: 'Sign Up',
        }}
      />
      <Stack.Screen
        name="chooseAccount"
        options={{
          ...options,
          presentation: 'modal',
          headerTitle: 'Choose Account',
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        options={{
          ...options,
          presentation: 'modal',
          headerTitle: 'Forgot Password',
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