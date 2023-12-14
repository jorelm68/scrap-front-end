import { View, TouchableOpacity, Image } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScrapComponent from './ScrapComponent'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import ScrapCarousel from './ScrapCarousel'
import { Ionicons } from '@expo/vector-icons'
import { colors, styles, dimensions } from '../data/styles'
import MapView, { Marker } from 'react-native-maps'
import useScrap from '../hooks/useScrap'
import AppContext from '../context/AppContext'

const ScrapMarker = ({ scrap }) => {
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
        'iPrograph->1080',
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
                backgroundColor: 'red',
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

export default ScrapMarker