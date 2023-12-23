import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { palette, fonts } from '../../data/styles'

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="offlineCamera"
                options={{
                    tabBarLabel: 'Camera',
                    tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'camera' : 'camera-outline'} size={size} color={color} />,
                    headerTitle: 'Camera',
                    headerTitleStyle: {
                        fontFamily: fonts.playBold,
                        fontSize: 24,
                        color: palette.color7,
                    },
                    headerStyle: {
                        backgroundColor: palette.color0,
                    },
                    tabBarStyle: {
                        backgroundColor: palette.color0,
                    },
                    tabBarInactiveTintColor: palette.color6,
                    tabBarActiveTintColor: palette.accent,
                }}
            />
            <Tabs.Screen
                name="offlineScraps"
                options={{
                    tabBarLabel: 'Scraps',
                    tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'image' : 'image-outline'} size={size} color={color} />,
                    headerTitle: 'Scraps',
                    headerTitleStyle: {
                        fontFamily: fonts.playBold,
                        fontSize: 24,
                        color: palette.color7,
                    },
                    headerStyle: {
                        backgroundColor: palette.color0,
                    },
                    tabBarStyle: {
                        backgroundColor: palette.color0,
                    },
                    tabBarInactiveTintColor: palette.color6,
                    tabBarActiveTintColor: palette.accent,
                }}
            />
        </Tabs>
    )
}

export default Layout