import { View, TouchableOpacity } from 'react-native-ui-lib'
import { Alert, ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScrapComponent from '../components/ScrapComponent'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import ScrapCarousel from '../components/ScrapCarousel'
import { Ionicons } from '@expo/vector-icons'
import { styles, dimensions, palette } from '../data/styles'
import MapView, { Polyline } from 'react-native-maps'
import useScrap from '../hooks/useScrap'
import AppContext from '../context/AppContext'
import ScrapMarker from './ScrapMarker'
import cache from '../data/cache'
import { utilityScrapCoordinates } from '../data/api'

const MapComponent = ({ scraps, scrap = scraps[0], clickMarker }) => {
    const { user } = useContext(AppContext)
    const [coordinates, setCoordinates] = useState([])

    const getCoordinates = async () => {
        const response = await utilityScrapCoordinates(scraps)
        if (!response.success) {
            Alert.alert('Error', response.error)
        }
        else {
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
                strokeColor={palette.color6}
                strokeWidth={2}
            />
        </MapView>
    )
}

export default MapComponent