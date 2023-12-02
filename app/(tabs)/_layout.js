import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { IconBook, IconPerson } from '../../data/icons'

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="one"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ size, color }) => <IconBook size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ size, color }) => <IconPerson size={size} color={color} />
                }}
            />
        </Tabs>
    )
}

export default Layout