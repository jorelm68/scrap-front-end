import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native'
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
import BookMarker from './BookMarker'

const Page = ({ author }) => {
    const navigation = useNavigation()
    const { palette } = useContext(AppContext)
    const [coordinates, setCoordinates] = useState([])
    const {
        profileBooks,
    } = useAuthor(author, [
        'profileBooks',
    ])
    const {
        representative,
    } = useBook(profileBooks[0], [
        'representative',
    ])
    const {
        latitude,
        longitude,
    } = useScrap(representative, [
        'latitude',
        'longitude',
    ])
    const [region, setRegion] = useState({
        latitude,
        longitude,
    })

    useEffect(() => {
        setRegion({
            latitude,
            longitude,
        })
    }, [latitude, longitude])

    const getCoordinates = async () => {
        const response = await utility.bookCoordinates(profileBooks)
        if (response.success) {
            setCoordinates(response.data.coordinates)
        }
    }
    useEffect(() => {
        getCoordinates()
    }, [profileBooks])

    return (
        <View style={{
            backgroundColor: palette.color1,
            width: dimensions.width,
            height: dimensions.height,
        }}>
            <ProfileHeader />

            <MapView
                region={region}
                style={{
                    width: dimensions.width,
                    borderRadius: 8,
                    height: dimensions.height - ((dimensions.width / 2) + (dimensions.width / 8 * 3) + (dimensions.width / 8)) - 90 - 16,
                }}
            >
                {profileBooks && profileBooks.map((book) => {
                    return (
                        <TouchableOpacity key={book} onPress={() => {
                            navigation.push({
                                pathname: '/book',
                                params: {
                                    book,
                                }
                            })
                        }}>
                            <BookMarker book={book} />
                        </TouchableOpacity>
                    )
                })}

                <Polyline
                    coordinates={coordinates}
                    strokeColor={palette.accent}
                    strokeWidth={2}
                />
            </MapView>
        </View>
    )
}

export default Page