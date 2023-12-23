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
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(authentication)/forgotPassword"
          options={{
            headerTitle: 'Forgot Password',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.color7,
            },
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
          }}
        />
        <Stack.Screen
          name="(authentication)/chooseAccount"
          options={{
            headerTitle: 'Choose your Account',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.color7,
            },
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerTitle: 'Settings',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.color7,
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name="likes"
          options={{
            headerTitle: 'Likes',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.color7,
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name="scrapPicker"
          options={{
            headerTitle: 'Scrap Picker',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.color7,
            },
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name="bookPicker"
          options={{
            headerTitle: 'Book Picker',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.color7,
            },
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="(offline)"
          options={{
            headerShown: false,
            gestureEnabled: false,
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
              color: palette.color7,
            },
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
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
              color: palette.color7,
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
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
              color: palette.color7,
            },
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name='offlineEditScrap'
          options={{
            headerTitle: 'Edit Scrap',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.color7,
            },
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
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
              color: palette.color7,
            },
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name='editScrap'
          options={{
            headerTitle: 'Edit Scrap',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.color7,
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
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
              color: palette.color7,
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name='editBook'
          options={{
            headerTitle: 'Edit Book',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.color7,
            },
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
        <Stack.Screen
          name="bookFinder"
          options={{
            headerTitle: 'Book Finder',
            headerTitleStyle: {
              fontFamily: fonts.playBold,
              fontSize: 24,
              color: palette.color7,
            },
            headerStyle: {
              backgroundColor: palette.color0, // Set your desired color here
            },
            headerLeft: router.canGoBack() ? () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={palette.color6} />
              </TouchableOpacity>
            ) : () => { },
          }}
        />
      </Stack>

    </AppContextProvider>
  )
}

export default Layout