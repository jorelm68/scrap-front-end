import { View, Text } from 'react-native-ui-lib'
import { ScrollView, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { dimensions, palette } from '../data/styles'
import BlankBookComponent from './BlankBookComponent'

const BookList = ({ header = () => { }, headerHeight = 0, books, renderItem }) => {
    const [rows, setRows] = useState([-1, 0, 1, 2, 3, 4, 5])
    const scrollViewRef = useRef(null)

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent
        const visibleOffset = contentOffset.y - headerHeight; // Consider the header height
        const visibleRange = visibleOffset + layoutMeasurement.height + headerHeight; // Subtract header height

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
                            <BlankBookComponent key={book} book={book} />
                        )
                    }
                })}
            </View>
        </ScrollView>
    )
}

export default BookList