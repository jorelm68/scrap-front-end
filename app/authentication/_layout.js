import { Stack, router } from 'expo-router'
import { dark, options } from '../../data/styles'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-ui-lib'

const Layout = () => {
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
                <Ionicons name='close-circle' color={dark.color6} size={24} />
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
                <Ionicons name='close-circle' color={dark.color6} size={24} />
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
                <Ionicons name='close-circle' color={dark.color6} size={24} />
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