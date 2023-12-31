import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import { useFocusEffect, useLocalSearchParams, navigation, router } from 'expo-router'
import { View, Text, Image, TouchableOpacity  } from 'react-native-ui-lib'
import MapView, { Polyline, Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import { dimensions, fonts } from '../data/styles'
import cache from '../data/cache'
import api from '../data/api'
import utility from '../data/utility'
import Profile from '../components/Profile'

const Screen = ({ author }) => {
    const { palette } = useContext(AppContext)

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

export default Screen