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
import { defaultImage, defaultHeadshot } from '../data/icons'

const Component = ({ actions, renderItem }) => {
    const { palette } = useContext(AppContext)
    const [rows, setRows] = useState([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    const scrollViewRef = useRef(null)

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent
        const visibleOffset = contentOffset.y
        const visibleRange = visibleOffset + layoutMeasurement.height + 1000

        if (actions && actions.length > 0) {
            const visibleItems = actions.reduce((acc, _, index) => {
                const itemDimensions = dimensions.width / 3
                const offset = index * itemDimensions
                if (offset >= visibleOffset && offset <= visibleRange) {
                    acc.push(index)
                }
                return acc
            }, [])
            setRows([visibleItems[0] - 1, ...visibleItems])
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16} // Adjust the frequency of onScroll event
            keyboardShouldPersistTaps={'always'}
            automaticallyAdjustKeyboardInsets={true}
            style={{
                width: dimensions.width,
                height: dimensions.height,
                backgroundColor: palette.color1,
            }}
        >
            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: 4,
            }}>
                {actions && actions.length > 0 && actions.map((action, index) => {
                    if (rows.includes(index)) {
                        return (
                            <View key={action}>
                                {renderItem(action)}
                            </View>
                        )
                    }
                    else {
                        return (
                            <View key={action} row style={{
                                width: dimensions.width,
                                height: 64,
                                borderBottomWidth: 1,
                                borderBottomColor: palette.color2,
                            }}>

                            </View>
                        )
                    }
                })}
            </View>
            <View height={200} />
        </ScrollView>
    )
}

export default Component