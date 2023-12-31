import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib'
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
import BookList from '../components/BookList'
import BookSmall from '../components/BookSmall'

const Screen = ({ author }) => {
    const { palette } = useContext(AppContext)

    const {
        likedBooks,
    } = useAuthor(author, [
        'likedBooks',
    ])

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
        }}>
            <BookList
                books={likedBooks}
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