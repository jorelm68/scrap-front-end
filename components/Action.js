import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { View, Text, Image } from 'react-native-ui-lib'
import MapView, { Polyline, Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import useAction from '../hooks/useAction'
import { dimensions, fonts } from '../data/styles'
import cache from '../data/cache'
import api from '../data/api'
import utility from '../data/utility'

const Page = ({ action }) => {
    const { palette } = useContext(AppContext)

    const {
        createdAt,
    } = useAction(action, [
        'createdAt',
    ])

    return (
        <View style={{
            width: dimensions.width,
            height: 64,
            borderBottomWidth: 1,
            borderBottomColor: palette.color2,
        }}>
            <Text style={{
                fontFamily: fonts.itim,
                fontSize: 24,
                color: palette.color6,
            }}>{utility.getDate(createdAt)}</Text>
        </View>
    )
}

export default Page