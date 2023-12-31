import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, router } from 'expo-router'
import { View, Text, Image } from 'react-native-ui-lib'
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
import BookSmall from '../components/BookSmall'
import BookList from '../components/BookList'

const Screen = () => {
    const navigation = useNavigation()
    const { palette, user } = useContext(AppContext)
    const [numUnread, setNumUnread] = useState(0)

    const {
        feed,
        actions,
    } = useAuthor(user, [
        'feed',
        'actions',
    ])

    const calculateNumUnread = async () => {
        let num = 0
        for (const action of actions) {
            const read = await cache.get('Action', action, 'read', user)
            if (!read) {
                num++
            }
        }
        setNumUnread(num)
    }

    useEffect(() => {
        calculateNumUnread()
    }, [])

    useEffect(() => {
        calculateNumUnread()
    }, [actions])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => {
                        router.navigate('/feed/actions')
                    }}>
                        <View row center>
                            <Text style={{
                                fontFamily: fonts.playBold,
                                fontSize: 12,
                                color: numUnread > 0 ? 'red' : palette.color6,
                            }}>{numUnread > 0 ? numUnread : ''}</Text>
                            <Ionicons name='notifications' size={24} color={numUnread > 0 ? 'red' : palette.color6} />
                        </View>
                    </TouchableOpacity>
                )
            }
        })
    }, [useNavigation, numUnread])

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
        }}>
            <BookList
                books={feed}
                renderItem={(book) => {
                    return (
                        <BookSmall book={book} key={book} clickable />
                    )
                }}
            />
        </View>
    )
}

export default Screen