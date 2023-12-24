import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { View, Text, Image } from 'react-native-ui-lib'
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

const Page = ({ scrap }) => {
    const { palette } = useContext(AppContext)
    const {
        latitude,
        longitude,
        title,
        description,
        iPrograph,
    } = useScrap(scrap, [
        'latitude',
        'longitude',
        'title',
        'description',
        'iPrograph->90',
    ])

    return (
        <Marker
            coordinate={{
                latitude,
                longitude,
            }}
            title={title}
            description={description}
        >
            <View center style={{
                width: 30,
                height: 30,
                backgroundColor: palette.accent,
                borderRadius: 15,
            }}>
                <Image
                    source={iPrograph}
                    style={{
                        width: '90%',
                        height: '90%',
                        borderRadius: 14,
                    }}
                    resizeMode="contain"
                />
            </View>
        </Marker>
    )
}

export default Page