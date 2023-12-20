import { View, Text, TouchableOpacity, Carousel } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import ScrapComponent from './ScrapComponent'
import Scrap from './Scrap'
import { useNavigation, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { styles, dimensions } from '../data/styles'
import AppContext from '../context/AppContext'
import cache from '../data/cache'

const ScrapCarousel = ({ scraps, initialPage = 0 }) => {
    const { currentScrap, setCurrentScrap } = useContext(AppContext)
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
                if (Math.abs(page - index) < 5) {
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

export default ScrapCarousel