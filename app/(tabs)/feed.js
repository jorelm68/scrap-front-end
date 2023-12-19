import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { deleteData } from '../../data/utility'
import { colors, dimensions, palette } from '../../data/styles'

const Feed = () => {
    const router = useRouter()

    // Function for handling when you press the logout button
    const handleLogout = async () => {
        deleteData('autothenticate')
        router.replace('/signIn')
        while (router.canGoBack()) {
            router.back()
        }
    }

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.secondary11,
        }}>
            <Button title='Logout' onPress={() => handleLogout()} />
        </View>
    )
}

export default Feed