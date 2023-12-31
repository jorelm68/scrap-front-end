import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect, useLocalSearchParams, navigation, router } from 'expo-router'
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

const Component = ({ scrap }) => {
    const { palette } = useContext(AppContext)
    const {
        iPrograph,
        iRetrograph,
    } = useScrap(scrap, [
        'iPrograph->270',
        'iRetrograph->270'
    ])

    return (
        <View>
            <Image source={iPrograph} style={{
                width: dimensions.width / 3,
                height: dimensions.width / 3,
            }} />
            <Image width={dimensions.width / 9} height={dimensions.width / 9} source={iRetrograph} style={{
                position: 'absolute',
                right: 0,
                top: 0,
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 8,
                borderBottomRightRadius: 8,
                width: dimensions.width / 9,
                height: dimensions.width / 9,
            }} />
        </View>
    )
}

export default Component