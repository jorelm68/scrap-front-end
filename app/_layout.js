import { Stack } from 'expo-router'
import { options } from '../data/styles'
import AppContextProvider from '../context/AppContextProvider'

const Layout = () => {
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