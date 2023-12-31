import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
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

const Component = ({ book }) => {
    const { palette } = useContext(AppContext)

    return (
        <View style={{
            marginBottom: 4,
            paddingHorizontal: 4,
        }}>
            <TouchableOpacity onPress={() => {
                router.navigate(`/${tab}/book/${book}`)
            }}>
                <View row style={{
                    width: (dimensions.width - 8),
                    height: (dimensions.width - 8) / 4,
                }}>
                    <View center style={{
                        width: (dimensions.width - 8) / 4,
                        height: (dimensions.width - 8) / 4,
                        borderRadius: 8,
                        backgroundColor: palette.color2,
                    }}>
                        <ActivityIndicator size='small' color={palette.color6} />
                    </View>
                </View>
            </TouchableOpacity >
        </View >
    )
}

export default Component