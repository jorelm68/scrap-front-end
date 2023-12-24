import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { View, Text, Image, TouchableOpacity  } from 'react-native-ui-lib'
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

const Page = ({ scraps, scrap = scraps[0], clickMarker }) => {
    const { palette } = useContext(AppContext)
    const [coordinates, setCoordinates] = useState([])

    const getCoordinates = async () => {
        const response = await utility.scrapCoordinates(scraps)
        if (!response.success) {
            setCoordinates(response.data.coordinates)
        }
    }
    useEffect(() => {
        getCoordinates()
    }, [scraps])

    const {
        latitude,
        longitude,
    } = useScrap(scrap, [
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
            {scraps && scraps.map((scrap) => {
                return (
                    <TouchableOpacity key={scrap} onPress={() => {
                        if (clickMarker) clickMarker(scraps.indexOf(scrap))
                    }}>
                        <ScrapMarker scrap={scrap} />
                    </TouchableOpacity>
                )
            })}

            <Polyline
                coordinates={coordinates}
                strokeColor={palette.accent}
                strokeWidth={2}
            />
        </MapView>
    )
}

export default Page