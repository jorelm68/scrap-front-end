import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { View, Text, Image, Switch } from 'react-native-ui-lib'
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

const Page = ({ title, value, onSwitch }) => {
    const { palette } = useContext(AppContext)

    return (
        <View centerV row>
        <Text style={{
            fontFamily: fonts.itim,
            fontSize: 12,
            paddingRight: 4,
            color: palette.color5,
        }}>{title}</Text>
            <Switch value={value} onValueChange={onSwitch} onColor={palette.accent} offColor={palette.color5}/>
        </View>
    )
}

export default Page