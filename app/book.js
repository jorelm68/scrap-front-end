import { View, Text } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import ScrapCarousel from '../components/ScrapCarousel'
import MapComponent from '../components/MapComponent'
import AppContext from '../context/AppContext'
import Book from '../components/Book'

const BookScreen = () => {
    const params = useLocalSearchParams()
    const book = params.book
    let scraps = []
    if (book === undefined) {
        scraps = JSON.parse(params.scraps)
    }

    return (
        <View>
            <Book book={book} scraps={scraps} />
        </View>
    )
}

export default BookScreen