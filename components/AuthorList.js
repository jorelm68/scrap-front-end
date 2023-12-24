import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
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

const Page = ({ authors, renderItem }) => {
    const { palette } = useContext(AppContext)
    const [rows, setRows] = useState([-1, 0, 1, 2, 3, 4, 5])
    const scrollViewRef = useRef(null)

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent
        const visibleOffset = contentOffset.y
        const visibleRange = visibleOffset + layoutMeasurement.height

        if (authors && authors.length > 0) {
            const visibleItems = authors.reduce((acc, _, index) => {
                const itemDimensions = dimensions.width / 3 // Assuming each item has a width of dimensions.width / 3
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
        <ScrollView showsVerticalScrollIndicator={false}
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
            }}>
                {authors && authors.length > 0 && authors.map((author, index) => {
                    if (rows.includes(index)) {
                        return (
                            <View key={author}>
                                {renderItem(author)}
                            </View>
                        )
                    }
                    else {
                        return (
                            <Image key={author} source={defaultImage} style={{
                                width: dimensions.width,
                                height: 64,
                            }} />
                        )
                    }
                })}
            </View>
        </ScrollView>
    )
}

export default Page