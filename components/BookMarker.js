import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard } from 'react-native'
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

const Component = ({ book }) => {
    const { palette } = useContext(AppContext)
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
                    color: palette.accent,
                }}>{title.length <= 10 ? title : title.slice(0, 10) + '...'}</Text>
                <View center style={{
                    width: 30,
                    height: 30,
                    backgroundColor: palette.accent,
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

export default Component