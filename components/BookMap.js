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
import BookMarker from './BookMarker'

const Component = ({ books, height = 200, polyline }) => {
    const { palette } = useContext(AppContext)
    const [coordinates, setCoordinates] = useState([])

    const getCoordinates = async () => {
        const response = await api.utility.bookCoordinates(books)
        if (response.success) {
            setCoordinates(response.data.coordinates)
        }
    }
    useEffect(() => {
        getCoordinates()
    }, [books])

    const mapViewRef = useRef()
    useEffect(() => {
        if (coordinates.length > 0) {
            if (mapViewRef.current && coordinates.length > 0) {
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

                // Calculate padding based on the fraction of delta values
                const paddingFraction = 0.5; // Adjust this fraction as needed
                const paddingLat = deltaLat * paddingFraction;
                const paddingLon = deltaLon * paddingFraction;

                const region = {
                    latitude: centerLat,
                    longitude: centerLon,
                    latitudeDelta: deltaLat + paddingLat,
                    longitudeDelta: deltaLon + paddingLon,
                };

                mapViewRef.current.animateToRegion(region, 1000); // Adjust animation duration as needed
            }
        }
    }, [coordinates]);

    return (
        <MapView
            ref={mapViewRef}
            style={{
                borderRadius: 8,
                width: dimensions.width,
                height,
            }}
        >
            {books && books.map((book) => {
                return (
                    <TouchableOpacity key={book} onPress={() => {
                        router.push(`/${tab}/book/${book}`)
                    }}>
                        <BookMarker book={book} />
                    </TouchableOpacity>
                )
            })}

            {polyline && (
                <Polyline
                    coordinates={coordinates}
                    strokeColor={palette.accent}
                    strokeWidth={2}
                />
            )}
        </MapView>
    )
}

export default Component