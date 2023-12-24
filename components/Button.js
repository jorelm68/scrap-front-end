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

const Page = ({ label, onPress, icon }) => {
    const { palette } = useContext(AppContext)

    return (
        <TouchableOpacity onPress={onPress}>
            <View center row style={{
                borderWidth: 1,
                borderColor: palette.color6,
                borderRadius: 24,
                paddingHorizontal: 8,
                paddingVertical: 4,
            }}>
                <Ionicons name={icon} color={palette.color6} size={24} />
                <Text style={{
                    fontFamily: fonts.itim,
                    fontSize: 12,
                    marginLeft: 2,
                    color: palette.color6,
                }}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Page