import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, router } from 'expo-router'
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
import ScrapMarker from './ScrapMarker'

const Component = ({ scraps, scrap: currentScrap = scraps[0], clickMarker }) => {
    const { palette } = useContext(AppContext)
    const [coordinates, setCoordinates] = useState([])

    const getCoordinates = async () => {
        const response = await api.utility.scrapCoordinates(scraps)
        if (response.success) {
            setCoordinates(response.data.coordinates)
        }
    }
    useEffect(() => {
        getCoordinates()
    }, [scraps])

    const {
        latitude,
        longitude,
    } = useScrap(currentScrap, [
        'latitude',
        'longitude',
    ])

    const [region, setRegion] = useState({
        latitude,
        longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    })

    const mapViewRef = useRef()

    useEffect(() => {
        setRegion((prevRegion) => ({
            ...prevRegion,
            latitude,
            longitude,
        }))
    }, [latitude, longitude])

    return (
        <MapView
            ref={mapViewRef}
            region={region}
            style={{
                width: dimensions.width,
                height: 200,
                borderRadius: 8,
            }}>
            {scraps && scraps.map((scrap, index) => {
                if (scraps.length <= 10 || Math.abs(scraps.indexOf(currentScrap) - index) <= 5) {
                    return (
                        <ScrapMarker key={scrap} scrap={scrap} />
                    )
                }
                return null
            })}

            <Polyline
                coordinates={coordinates}
                strokeColor={palette.accent}
                strokeWidth={2}
            />
        </MapView>
    )
}

export default Component