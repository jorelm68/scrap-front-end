import { View, TouchableOpacity } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScrapComponent from '../components/ScrapComponent'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import ScrapCarousel from '../components/ScrapCarousel'
import { Ionicons } from '@expo/vector-icons'
import { colors, styles, dimensions } from '../data/styles'
import MapView, { Polyline } from 'react-native-maps'
import useScrap from '../hooks/useScrap'
import AppContext from '../context/AppContext'
import ScrapMarker from './ScrapMarker'
import { getCoordinates } from '../data/utility'
import cache from '../data/cache'

const MapComponent = ({ scraps, scrap, clickMarker }) => {
    const { user } = useContext(AppContext)
    const [coordinates, setCoordinates] = useState([])
    useEffect(() => {
        getCoordinates(scraps, user).then((coordinates) => {
            console.log(coordinates)
            setCoordinates(coordinates)
        }).catch(() => {
            console.log('ERROR')
        })
    }, [])

    const {
        latitude,
        longitude,
    } = useScrap(scrap, [
        'latitude',
        'longitude',
    ])

    const [region, setRegion] = useState({
        latitude, // Your initial latitude
        longitude, // Your initial longitude
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
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
                width: '100%',
                height: 200,
                borderRadius: 8,
            }}>
            {scraps && scraps.map((scrap) => {
                return (
                    <TouchableOpacity key={scrap} onPress={() => {
                        clickMarker(scraps.indexOf(scrap))
                    }}>
                        <ScrapMarker scrap={scrap} />
                    </TouchableOpacity>
                )
            })}

            <Polyline
                coordinates={coordinates}
                strokeColor='red' // Change this to the desired color
                strokeWidth={2}
            />
        </MapView>
    )
}

export default MapComponent