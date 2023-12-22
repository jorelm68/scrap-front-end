import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { palette, fonts } from '../../data/styles'

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="feed"
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />,
                    headerTitle: 'Feed',
                    headerTitleStyle: {
                        fontFamily: fonts.playBold,
                        fontSize: 24,
                        color: palette.complement0,
                    },
                    headerStyle: {
                        backgroundColor: palette.complement3,
                    },
                    tabBarStyle: {
                        backgroundColor: palette.complement3,
                    },
                    tabBarInactiveTintColor: palette.complement2,
                    tabBarActiveTintColor: palette.complement0,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />,
                    headerTitle: 'Search',
                    headerTitleStyle: {
                        fontFamily: fonts.playBold,
                        fontSize: 24,
                        color: palette.complement0,
                    },
                    headerStyle: {
                        backgroundColor: palette.complement3,
                    },
                    tabBarStyle: {
                        backgroundColor: palette.complement3,
                    },
                    tabBarInactiveTintColor: palette.complement2,
                    tabBarActiveTintColor: palette.complement0,
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    tabBarLabel: 'Camera',
                    tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'camera' : 'camera-outline'} size={size} color={color} />,
                    headerTitle: 'Scrap',
                    headerTitleStyle: {
                        fontFamily: fonts.playBold,
                        fontSize: 24,
                        color: palette.complement0,
                    },
                    headerStyle: {
                        backgroundColor: palette.complement3,
                    },
                    tabBarStyle: {
                        backgroundColor: palette.complement3,
                    },
                    tabBarInactiveTintColor: palette.complement2,
                    tabBarActiveTintColor: palette.complement0,
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    tabBarLabel: 'Library',
                    tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'library' : 'library-outline'} size={size} color={color} />,
                    headerTitle: 'Library',
                    headerTitleStyle: {
                        fontFamily: fonts.playBold,
                        fontSize: 24,
                        color: palette.complement0,
                    },
                    headerStyle: {
                        backgroundColor: palette.complement3,
                    },
                    tabBarStyle: {
                        backgroundColor: palette.complement3,
                    },
                    tabBarInactiveTintColor: palette.complement2,
                    tabBarActiveTintColor: palette.complement0,
                }}
            />
            <Tabs.Screen
                name="profileInitial"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />,
                    headerTitle: 'Profile',
                    headerTitleStyle: {
                        fontFamily: fonts.playBold,
                        fontSize: 24,
                        color: palette.complement0,
                    },
                    headerStyle: {
                        backgroundColor: palette.complement3,
                    },
                    tabBarStyle: {
                        backgroundColor: palette.complement3,
                    },
                    tabBarInactiveTintColor: palette.complement2,
                    tabBarActiveTintColor: palette.complement0,
                }}
            />
        </Tabs>
    )
}

export default Layout