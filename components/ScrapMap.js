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

const Component = ({ scraps, scrapbook }) => {
    const { palette, currentPage, setCurrentPage } = useContext(AppContext)
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
            let region;
            if (coordinates.length === 1) {
                // Adjust zoom level for a single coordinate
                const singleCoordinate = coordinates[0];
                const defaultZoom = 0.2; // Adjust the default zoom level as needed

                region = {
                    latitude: singleCoordinate.latitude,
                    longitude: singleCoordinate.longitude,
                    latitudeDelta: defaultZoom,
                    longitudeDelta: defaultZoom,
                };
            } else {
                const lats = coordinates.map(coord => coord.latitude);
                const lons = coordinates.map(coord => coord.longitude);

                const minLat = Math.min(...lats);
                const maxLat = Math.max(...lats);
                const minLon = Math.min(...lons);
                const maxLon = Math.max(...lons);

                const deltaLat = maxLat - minLat;
                const deltaLon = maxLon - minLon;

                const centerLat = (maxLat + minLat) / 2;
                const centerLon = (maxLon + minLon) / 2;

                const paddingFraction = 0.5; // Adjust this fraction as needed
                const paddingLat = deltaLat * paddingFraction;
                const paddingLon = deltaLon * paddingFraction;

                region = {
                    latitude: centerLat,
                    longitude: centerLon,
                    latitudeDelta: deltaLat + paddingLat,
                    longitudeDelta: deltaLon + paddingLon,
                };
            }

            mapViewRef.current.animateToRegion(region, 1000); // Adjust animation duration as needed
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
                            <ScrapMarker scrap={scrap} index={index} scrapbook />
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