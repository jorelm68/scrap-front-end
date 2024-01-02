import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
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
import Scrap from '../components/Scrap'

const Page = ({ scraps, page }) => {
    const { palette } = useContext(AppContext)
    const [current, setCurrent] = useState(page)

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
        }}>
            <Carousel
                onChangePage={(newIndex) => {
                    setCurrent(newIndex);
                }}
                initialPage={page}
                showCounter
            >
                {scraps && scraps.map((scrap, index) => {
                    if (Math.abs(current - index) < 3) {
                        return (
                            <Scrap scrap={scrap} key={scrap} />
                        )
                    }
                    return (
                        <View key={scrap} />
                    )
                })}
            </Carousel>
        </View>
    )
}

export default Page