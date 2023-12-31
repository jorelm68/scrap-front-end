import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, router } from 'expo-router'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import ScrapCarousel from '../components/ScrapCarousel'
import AppContext from '../context/AppContext'
import Book from '../components/Book'
import { dimensions } from '../data/styles'
import useAuthor from '../hooks/useAuthor'
import { Ionicons } from '@expo/vector-icons'

const Screen = ({ book, page = 0, scraps = [] }) => {
    const { palette } = useContext(AppContext)

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
        }}>
            <Book book={book} scraps={scraps.reverse()} page={page} />
        </View>
    )
}

export default Screen