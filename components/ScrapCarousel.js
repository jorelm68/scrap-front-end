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

const Component = ({ scraps }) => {
    const { palette, currentPage, setCurrentPage } = useContext(AppContext)
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        setForceUpdate(prev => !prev); // Toggle the forceUpdate state to trigger re-render
    }, [currentPage]);

    return (
        <Carousel
            key={`carousel-${currentPage}`} // Use currentPage directly in the key
            onChangePage={(newIndex) => {
                setCurrentPage(newIndex);
            }}
            initialPage={currentPage} // Set initialPage using currentPage directly
            showCounter
        >
            {scraps && scraps.map((scrap, index) => {
                if (Math.abs(currentPage - index) < 3) {
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