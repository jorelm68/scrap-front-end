import { View, Text, Keyboard } from 'react-native'
import React, { useContext } from 'react'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { palette, fonts } from '../data/styles'
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
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerTitle: 'Settings',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name="scrapPicker"
          options={{
            presentation: 'modal',
            headerTitle: 'Scrap Picker',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name="bookPicker"
          options={{
            presentation: 'modal',
            headerTitle: 'Book Picker',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
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
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name='books'
          options={{
            headerTitle: 'Books',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name='book'
          options={{
            headerTitle: 'Book',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name='createBook'
          options={{
            headerTitle: 'Create Book',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name='editScrap'
          options={{
            presentation: 'modal',
            headerTitle: 'Edit Scrap',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name='profile'
          options={{
            headerTitle: 'Profile',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name='editBook'
          options={{
            presentation: 'modal',
            headerTitle: 'Edit Book',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name="bookFinder"
          options={{
            presentation: 'modal',
            headerTitle: 'Book Finder',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.secondary14,
            },
            headerStyle: {
              backgroundColor: palette.complement2, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.secondary14} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
      </Stack>

    </AppContextProvider>
  )
}

export default Layout