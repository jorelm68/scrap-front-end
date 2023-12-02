import { Redirect } from 'expo-router'
import AppContextProvider from '../context/AppContextProvider'
import { View } from 'react-native'
import { Button } from 'tamagui'
import { useRouter, Link } from 'expo-router'

export default function App() {
  const router = useRouter()
  return (
    <AppContextProvider>
      <View>
        <Button onPress={() => router.push('/register')}>
          <Text>Open register</Text>
        </Button>
        <Link href={'/register'} asChild>
          <Button title='Open Register with link' />
        </Link>
        <Link href={'/one'} replace asChild>
          <Button title='Login' />
        </Link>
      </View>
    </AppContextProvider>
  )
}