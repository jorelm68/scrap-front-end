import { View, Text, TouchableOpacity, Image } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScrapComponent from './ScrapComponent'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import ScrapCarousel from './ScrapCarousel'
import { Ionicons } from '@expo/vector-icons'
import { styles, dimensions, fonts, palette } from '../data/styles'
import MapView, { Marker, Callout } from 'react-native-maps'
import useScrap from '../hooks/useScrap'
import AppContext from '../context/AppContext'
import useBook from '../hooks/useBook'

const BookMarker = ({ book }) => {
    const {
        representative,
        title,
        description,
    } = useBook(book, [
        'representative',
        'title',
        'description',
    ])

    const {
        latitude,
        longitude,
        iPrograph,
    } = useScrap(representative, [
        'latitude',
        'longitude',
        'iPrograph->90',
    ])

    return (
        <Marker
            coordinate={{
                latitude,
                longitude,
            }}
        >
            <View center>
                <Text style={{
                    fontFamily: fonts.itim,
                    fontSize: 12,
                    color: palette.color1,
                }}>{title.length <= 10 ? title : title.slice(0, 10) + '...'}</Text>
                <View center style={{
                    width: 30,
                    height: 30,
                    backgroundColor: palette.color1,
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
                <View height={14} />
            </View>


        </Marker>
    )
}

export default BookMarker