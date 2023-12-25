import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
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
import ActionList from '../components/ActionList'
import Action from '../components/Action'

const Screen = () => {
    const { palette, user } = useContext(AppContext)

    const {
        actions,
        setActions,
    } = useAuthor(user, [
        'actions',
    ])

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
        }}>
            <ActionList actions={actions} renderItem={(action) => {
                return (
                    <Action key={action} action={action} handleRemove={async (action) => {
                        const response = await api.author.removeAction(user, action)
                        if (response.success) {
                            cache.filter([user, 'actions'])
                            cache.filter([action])
                            setActions((prevActions) => [
                                ...prevActions.filter((value) => {
                                    return value !== action
                                })
                            ])
                        }
                    }}/>
                )
            }} />
        </View>
    )
}

export default Screen