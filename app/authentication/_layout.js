import { Stack } from 'expo-router'
import { options } from '../../data/styles'

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

export default Layout