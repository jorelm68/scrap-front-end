import { Redirect } from 'expo-router'
import AppContextProvider from '../context/AppContextProvider'

export default function App() {
  return (
    <AppContextProvider>
      <Redirect href='/feed' />
    </AppContextProvider>
  )
}