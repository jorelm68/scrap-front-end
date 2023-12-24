import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { View, Text, Image } from 'react-native-ui-lib'
import MapView, { Polyline, Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import AppContext from '../../../../context/AppContext'
import useAuthor from '../../../../hooks/useAuthor'
import useBook from '../../../../hooks/useBook'
import useScrap from '../../../../hooks/useScrap'
import { dimensions, fonts } from '../../../../data/styles'
import cache from '../../../../data/cache'
import api from '../../../../data/api'
import utility from '../../../../data/utility'
import Profile from '../../../../components/Profile'

const Page = () => {
    const navigation = useNavigation()
    const { palette, user } = useContext(AppContext)
    const { author } = useLocalSearchParams()

    const {
        firstName,
        lastName,
    } = useAuthor(author, [
        'firstName',
        'lastName',
    ])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `${firstName} ${lastName}`,
        });
    }, [navigation, firstName, lastName])


    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
        }}>
            <Profile author={author} />
        </View>
    )
}

export default Page