import { Stack, router } from "expo-router";
import { options } from '../../../../data/styles'
import { Ionicons } from '@expo/vector-icons'
import { useContext } from "react";
import AppContext from "../../../../context/AppContext";
import { TouchableOpacity } from 'react-native-ui-lib'

const Layout = () => {
  const { palette } = useContext(AppContext)
  return (
    <Stack>
      <Stack.Screen
        name='likes'
        options={{
          ...options,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => {
                router.back()
              }}>
                <Ionicons name='chevron-back' color={palette.color6} size={24} />
              </TouchableOpacity>
            )
          },
          headerTitle: 'Likes',
        }}
      />
      <Stack.Screen
        name='scrapsCarousel'
        options={{
          ...options,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => {
                router.back()
              }}>
                <Ionicons name='chevron-back' color={palette.color6} size={24} />
              </TouchableOpacity>
            )
          },
          headerTitle: 'Scrap',
        }}
      />
      <Stack.Screen
        name='editBook'
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
          headerTitle: 'Edit Book',
        }}
      />
      <Stack.Screen
        name='editScrap'
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
          headerTitle: 'Edit Scrap',
        }}
      />
      <Stack.Screen
        name='findBooks'
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
          headerTitle: 'Find Books',
        }}
      />
      <Stack.Screen
        name='[book]'
        options={{
          ...options,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => {
                router.back()
              }}>
                <Ionicons name='chevron-back' color={palette.color6} size={24} />
              </TouchableOpacity>
            )
          },
          headerTitle: 'Book',
        }}
      />
      <Stack.Screen
        name='books'
        options={{
          ...options,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => {
                router.back()
              }}>
                <Ionicons name='chevron-back' color={palette.color6} size={24} />
              </TouchableOpacity>
            )
          },
          headerTitle: 'Books',
        }}
      />
      <Stack.Screen
        name='createBook'
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
          headerTitle: 'Create Book',
        }}
      />
      <Stack.Screen
        name='scraps'
        options={{
          ...options,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => {
                router.back()
              }}>
                <Ionicons name='chevron-back' color={palette.color6} size={24} />
              </TouchableOpacity>
            )
          },
          headerTitle: 'Scraps',
        }}
      />
      <Stack.Screen
        name='chooseScraps'
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
          headerTitle: 'Choose Scraps',
        }}
      />
    </Stack>
  )
}

export default Layout