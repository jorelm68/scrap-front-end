import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="feed"
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ size, color }) => <Ionicons name={'home'} size={size} color={color} />,
                    headerTitle: 'Feed',
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ size, color }) => <Ionicons name={'search'} size={size} color={color} />,
                    headerTitle: 'Search',
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    tabBarLabel: 'Camera',
                    tabBarIcon: ({ size, color }) => <Ionicons name={'camera'} size={size} color={color} />,
                    headerTitle: 'Camera',
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    tabBarLabel: 'Library',
                    tabBarIcon: ({ size, color }) => <Ionicons name={'library'} size={size} color={color} />,
                    headerTitle: 'Library',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ size, color }) => <Ionicons name={'person'} size={size} color={color} />,
                    headerTitle: 'Profile',
                    headerTitleStyle: {
                        fontFamily: 'playBold',
                        fontSize: 24,
                    }                   
                }}
            />
        </Tabs>
    )
}

export default Layout