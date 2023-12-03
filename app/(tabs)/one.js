import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { deleteData } from '../../data/utility'

const Page = () => {
    const router = useRouter()
    return (
        <View>
            <Button title='Logout' onPress={() => {
                deleteData('autothenticate')
                router.replace('/signIn')
            }} />
        </View>
    )
}

export default Page