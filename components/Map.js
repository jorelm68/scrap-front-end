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

const Component = ({ scraps }) => {
    const { palette, setCurrentPage } = useContext(AppContext)
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

    const mapViewRef = useRef()
    useEffect(() => {
        if (coordinates.length > 0) {
            const scrapCoordinates = coordinates.slice(0, 10); // Get the first 10 scrap coordinates
            if (mapViewRef.current && scrapCoordinates.length > 0) {
                const lats = scrapCoordinates.map(coord => coord.latitude);
                const lons = scrapCoordinates.map(coord => coord.longitude);

                const minLat = Math.min(...lats);
                const maxLat = Math.max(...lats);
                const minLon = Math.min(...lons);
                const maxLon = Math.max(...lons);

                const deltaLat = maxLat - minLat;
                const deltaLon = maxLon - minLon;

                const centerLat = (maxLat + minLat) / 2;
                const centerLon = (maxLon + minLon) / 2;

                const padding = 0.5; // Adjust this value for desired padding

                const region = {
                    latitude: centerLat,
                    longitude: centerLon,
                    latitudeDelta: deltaLat + padding,
                    longitudeDelta: deltaLon + padding,
                };

                mapViewRef.current.animateToRegion(region, 1000); // Adjust animation duration as needed
            }
        }
    }, [coordinates]);

    return (
        <MapView
            ref={mapViewRef}
            style={{
                width: dimensions.width,
                height: 200,
                borderRadius: 8,
            }}>
            {scraps && scraps.map((scrap, index) => {
                if (scraps.length <= 10 || Math.abs(currentPage - index) <= 5) {
                    return (
                        <TouchableOpacity key={scrap} onPress={() => {
                            setCurrentPage(index)
                        }}>
                            <ScrapMarker scrap={scrap} />
                        </TouchableOpacity>
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