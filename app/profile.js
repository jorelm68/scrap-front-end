import { View, Text } from 'react-native'
import React from 'react'
import ProfileComponent from '../components/ProfileComponent'
import { useLocalSearchParams } from 'expo-router'

const ProfileScreen = () => {
    const params = useLocalSearchParams()
    const author = params.author
    return (
        <ProfileComponent
            author={author}
        />
    )
}

export default ProfileScreen