import { View, Text, TouchableOpacity, Carousel } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import ScrapComponent from './ScrapComponent'
import Scrap from './Scrap'
import { useNavigation, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { colors, styles, dimensions } from '../data/styles'
import AppContext from '../context/AppContext'
import cache from '../data/cache'

const ScrapCarousel = ({ scraps, initialPage = 0, width = '100%', height = '100%' }) => {
    const navigation = useNavigation()
    const router = useRouter()
    const { currentScrap, setCurrentScrap } = useContext(AppContext)
    const [page, setPage] = useState(initialPage)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={async () => {
                    router.push({
                        pathname: '/editScrap', params: {
                            scrap: currentScrap,
                        }
                    })
                }}>
                    <Ionicons name='pencil' color={colors.default} size={32} />
                </TouchableOpacity>
            ),
        })
    }, [navigation, currentScrap])

    useEffect(() => {
        setCurrentScrap(scraps[initialPage])
    }, [])

    return (
        <View style={{
            width,
            height,
        }}>
            <Carousel
                onChangePage={(newIndex) => {
                    setPage(newIndex)
                    setCurrentScrap(scraps[newIndex])
                }}
                initialPage={initialPage}
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
        </View>
    )
}

export default ScrapCarousel