import { View, Text, Keyboard } from 'react-native'
import React, { useContext } from 'react'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { colors, styles } from '../data/styles'
import { TouchableOpacity } from 'react-native-ui-lib'
import AppContextProvider from '../context/AppContextProvider'

const Layout = () => {
  const router = useRouter()
  return (
    <AppContextProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(authentication)/signIn"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(authentication)/signUp"
          options={{
            presentation: 'modal',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(authentication)/chooseAccount"
          options={{
            presentation: 'modal',
            headerTitle: 'Choose your Account',
            headerTitleStyle: {
              fontFamily: styles.text3,
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerTitle: 'Settings',
            headerTitleStyle: {
              fontFamily: styles.text3,
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="scrapPicker"
          options={{
            presentation: 'modal',
            headerTitle: 'Scrap Picker',
            headerTitleStyle: {
              fontFamily: styles.text3,
              fontSize: 24,
            }
          }}
        />
        <Stack.Screen
          name="bookPicker"
          options={{
            presentation: 'modal',
            headerTitle: 'Book Picker',
            headerTitleStyle: {
              fontFamily: styles.text3,
              fontSize: 24,
            }
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="loading"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='scraps'
          options={{
            headerTitle: 'Scraps',
            headerTitleStyle: {
              fontFamily: styles.text3,
              fontSize: 24,
            }
          }}
        />
        <Stack.Screen
          name='books'
          options={{
            headerTitle: 'Books',
            headerTitleStyle: {
              fontFamily: styles.text3,
              fontSize: 24,
            }
          }}
        />
        <Stack.Screen
          name='createBook'
          options={{
            headerTitle: 'Create Book',
            headerTitleStyle: {
              fontFamily: styles.text3,
              fontSize: 24,
            }
          }}
        />
        <Stack.Screen
          name='editScrap'
          options={{
            presentation: 'modal',
            headerTitle: 'Edit Scrap',
            headerTitleStyle: {
              fontFamily: styles.text3,
              fontSize: 24,
            },
            headerBackTitleVisible: false,
          }}
        />
      </Stack>
    </AppContextProvider>
  )
}

export default Layout