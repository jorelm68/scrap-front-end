import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, router } from 'expo-router'
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
import BookBlankSmall from './BookBlankSmall'

const Component = ({ header = () => { }, headerHeight = 0, books, renderItem }) => {
    const { palette } = useContext(AppContext)
    const [rows, setRows] = useState([-1, 0, 1, 2, 3, 4, 5])
    const scrollViewRef = useRef(null)

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent
        const visibleOffset = contentOffset.y - headerHeight - 3000; // Consider the header height
        const visibleRange = visibleOffset + layoutMeasurement.height + headerHeight + 3000; // Subtract header height

        if (books && books.length > 0) {
            const visibleItems = books.reduce((acc, _, index) => {
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
            {header()}
            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: 4,
            }}>
                {books && books.length > 0 && books.map((book, index) => {
                    if (rows.includes(index)) {
                        return (
                            <View key={book}>
                                {renderItem(book)}
                            </View>
                        )
                    }
                    else {
                        return (
                            <BookBlankSmall key={book} book={book} />
                        )
                    }
                })}
            </View>
            <View height={200} />
        </ScrollView>
    )
}

export default Component