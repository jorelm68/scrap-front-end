import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { deleteData } from '../../data/utility'
import { dimensions, palette } from '../../data/styles'

const Feed = () => {
    const router = useRouter()

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.secondary11,
        }}>
        </View>
    )
}

export default Feed