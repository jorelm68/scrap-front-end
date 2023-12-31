import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, router } from 'expo-router'
import { View, Text, Image, TouchableOpacity, Carousel } from 'react-native-ui-lib'
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
import Scrap from './Scrap'

const Component = ({ scraps, initialPage = 0 }) => {
    const { palette, setCurrentScrap } = useContext(AppContext)
    
    const [page, setPage] = useState(initialPage)
    useEffect(() => {
        setCurrentScrap(scraps[initialPage])
    }, [])

    return (
        <Carousel
            onChangePage={(newIndex) => {
                setPage(newIndex)
                setCurrentScrap(scraps[newIndex])
            }}
            initialPage={initialPage}
            showCounter
        >
            {scraps && scraps.map((scrap, index) => {
                if (Math.abs(page - index) < 3) {
                    return (
                        <Scrap scrap={scrap} key={scrap} />
                    )
                }
                return (
                    <View key={scrap} />
                )
            })}
        </Carousel>
    )
}

export default Component