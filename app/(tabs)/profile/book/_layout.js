import { Stack, router } from "expo-router";
import { options } from '../../../../data/styles'
import { useContext } from "react";
import AppContext from "../../../../context/AppContext";
import { Ionicons } from '@expo/vector-icons'
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
        </Stack>
    )
}

export default Layout