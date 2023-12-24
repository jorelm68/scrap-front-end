import { View, Text, Keyboard } from 'react-native'
import React, { useContext } from 'react'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { fonts } from '../../data/styles'
import { TouchableOpacity } from 'react-native-ui-lib'
import AppContext from '../../context/AppContext'
import AppContextProvider from '../../context/AppContextProvider'

const Layout = () => {
  const { palette } = useContext(AppContext)
  const router = useRouter()
  return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{
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