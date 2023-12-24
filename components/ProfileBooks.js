import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
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
import BookList from './BookList'
import ProfileHeader from './ProfileHeader'

const Page = ({ author }) => {
    const { palette } = useContext(AppContext)
    const {
        profileBooks,
    } = useAuthor(author, [
        'profileBooks',
    ])

    return (
        <BookList
            header={ProfileHeader}
            headerHeight={(dimensions.width / 2) + (dimensions.width / 4 / 2) + (48 * 3 + 4 * 2 + 4 * 2)}
            books={profileBooks}
            renderItem={(book) => {
                return (
                    <BookComponent book={book} key={book} clickable showAuthor />
                )
            }}
        />
    )
}

export default Page