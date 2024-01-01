import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib'
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
import { defaultImage } from '../data/icons'
import ScrapList from '../components/ScrapList'

const Screen = () => {
    const { palette } = useContext(AppContext)
    const [scraps, setScraps] = useState([])
    const router = useRouter()

    const getScraps = async () => {
        const scraps = await utility.offlineGetScraps()
        setScraps(scraps)
    }

    useFocusEffect(() => {
        getScraps()
    });

    return (
        <ScrapList
            scraps={scraps}
            renderItem={(scrap, index) => {
                return (
                    <TouchableOpacity key={index} style={{
                        width: dimensions.width / 3,
                        height: dimensions.width / 3,
                    }} onPress={() => {
                        router.navigate({
                            pathname: '/offlineEditScrap',
                            params: {
                                index: JSON.stringify(index),
                            }
                        })
                    }}>
                        <Image source={scrap.iPrograph} style={{
                            width: dimensions.width / 3,
                            height: dimensions.width / 3,
                        }} />
                        <Image width={dimensions.width / 9} height={dimensions.width / 9} source={scrap.iRetrograph} style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            borderBottomLeftRadius: 8,
                            borderTopLeftRadius: 8,
                            borderBottomRightRadius: 8,
                            width: dimensions.width / 9,
                            height: dimensions.width / 9,
                        }} />
                    </TouchableOpacity>
                )
            }}
        />
    )
}

export default Screen