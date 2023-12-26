import { Stack, router } from 'expo-router'
import { options } from '../../data/styles'
import { Ionicons } from '@expo/vector-icons'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { TouchableOpacity } from 'react-native-ui-lib'

const Layout = () => {
  const { palette } = useContext(AppContext)
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
          headerTitle: 'Sign Up',
        }}
      />
      <Stack.Screen
        name="chooseAccount"
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
          headerTitle: 'Choose Account',
        }}
      />
      <Stack.Screen
        name="forgotPassword"
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
          headerTitle: 'Forgot Password',
        }}
      />
    </Stack>
  )
}

export default Layout