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
        sender,
        target,
        type,
        createdAt,
    } = useAction(action, [
        'sender',
        'target',
        'type',
        'createdAt',
    ])

    const {
        iHeadshot,
        firstName,
        lastName,
        pseudonym,
    } = useAuthor(sender.author, [
        'iHeadshot->90',
        'firstName',
        'lastName',
        'pseudonym',
    ])

    return (
        <View style={{
            width: dimensions.width,
            height: 64,
            borderBottomWidth: 1,
            borderBottomColor: palette.color2,
        }}>
            <View row>
                <Image source={iHeadshot} style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                }} />
                <Text style={{
                    fontFamily: fonts.itim,
                    fontSize: 12,
                    color: palette.color6,
                }}>{utility.formatName(firstName, lastName, pseudonym)}</Text>
            </View>
        </View>
    )
}

export default Page