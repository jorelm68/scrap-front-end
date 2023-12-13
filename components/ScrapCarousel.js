import { View, Text, TouchableOpacity, Carousel } from 'react-native-ui-lib'
import React, { useEffect, useState } from 'react'
import ScrapComponent from './ScrapComponent'
import Scrap from './Scrap'
import { useNavigation, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { colors, styles, dimensions } from '../data/styles'

const ScrapCarousel = ({ scraps }) => {
    const navigation = useNavigation()
    const router = useRouter()
    const [scrap, setScrap] = useState(scraps[0])

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
            <Carousel onChangePage={(newIndex) => {
                setScrap(scraps[newIndex])
            }}>
                {scraps && scraps.map((scrap) => {
                    return (
                        <Scrap scrap={scrap} key={scrap} />
                    )
                })}
            </Carousel>
        </View>
    )
}

export default ScrapCarousel