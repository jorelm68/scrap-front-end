import { View, Text, TouchableOpacity, Carousel } from 'react-native-ui-lib'
import React, { useEffect, useState } from 'react'
import ScrapComponent from './ScrapComponent'
import Scrap from './Scrap'
import { useNavigation, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { colors, styles, dimensions } from '../data/styles'

const ScrapCarousel = ({ scraps, initialPage = 0 }) => {
    const navigation = useNavigation()
    const router = useRouter()
    const [scrap, setScrap] = useState(scraps[initialPage])
    const [page, setPage] = useState(initialPage)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={async () => {
                    router.push({
                        pathname: '/editScrap', params: {
                            scrap,
                        }
                    })
                }}>
                    <Ionicons name='pencil' color={colors.default} size={32} />
                </TouchableOpacity>
            ),
        })
    }, [navigation, scrap])

    return (
        <View>
            <Carousel
                onChangePage={(newIndex) => {
                    setScrap(scraps[newIndex])
                    setPage(newIndex)
                }}
                initialPage={initialPage}
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
        </View>
    )
}

export default ScrapCarousel