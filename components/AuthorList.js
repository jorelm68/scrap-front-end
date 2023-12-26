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
import { defaultImage, defaultHeadshot } from '../data/icons'

const Component = ({ header = () => { }, headerHeight = 0, authors, renderItem }) => {
    const { palette } = useContext(AppContext)
    const [rows, setRows] = useState([-1, 0, 1, 2, 3, 4, 5])
    const scrollViewRef = useRef(null)

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent
        const visibleOffset = contentOffset.y - headerHeight - 3000; // Consider the header height
        const visibleRange = visibleOffset + layoutMeasurement.height + headerHeight - 3000; // Subtract header height

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
            {header()}
            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: 4,
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
                            <View key={author} row style={{
                                width: dimensions.width - 8,
                                paddingHorizontal: 4,
                                marginVertical: 4,
                                height: 64,
                            }}>
                                <View style={{
                                    width: `${(2 / 3) * 100}%`,
                                    height: 64,
                                }}>
                                    <View style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        paddingLeft: 32,
                                    }}>
                                        <Image source={defaultImage} style={{
                                            width: '100%',
                                            height: 64,
                                            borderTopRightRadius: 32,
                                            borderBottomRightRadius: 32,
                                        }} />
                                    </View>

                                    <View style={{
                                        position: 'absolute',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        marginLeft: 32,
                                        paddingRight: 8,
                                        borderRadius: 24,
                                        marginTop: 16,
                                    }} />
                                    <Image source={defaultHeadshot} style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 32,
                                    }} />
                                </View>

                                <View center style={{
                                    width: `${(1 / 3) * 100}%`,
                                    height: 64,
                                }}>
                                    <ActivityIndicator size='small' color={palette.color6} />
                                </View>
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