import { View, Text } from 'react-native-ui-lib'
import { ScrollView, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { dimensions, palette } from '../data/styles'
import defaultImage from '../assets/icons/defaultImage.jpg'

const AuthorList = ({ authors, renderItem }) => {
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
        <ScrollView
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

export default AuthorList