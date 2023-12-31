import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect, useLocalSearchParams, navigation, router } from 'expo-router'
import { View, Text, Image, TouchableOpacity  } from 'react-native-ui-lib'
import MapView, { Polyline } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import { dimensions, fonts } from '../data/styles'
import cache from '../data/cache'
import api from '../data/api'
import utility from '../data/utility'

const Component = () => {
    const { palette } = useContext(AppContext)

    return (
        <View style={{ marginVeritcal: 16 }}>
            <Text style={{
                fontFamily: fonts.jockeyOne,
                fontSize: 48,
                color: palette.color5,
            }}>Scrap</Text>
        </View>
    )
}

export default Component