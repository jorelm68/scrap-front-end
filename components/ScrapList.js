import { View, Text } from 'react-native-ui-lib'
import { ScrollView, Image } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { dimensions } from '../data/styles'
import defaultImage from '../assets/icons/defaultImage.jpg'
import AppContext from '../context/AppContext'

const ScrapList = ({ scraps, renderItem }) => {
    const { palette } = useContext(AppContext)
    const [rows, setRows] = useState([-1, 0, 1, 2, 3, 4, 5])
    const scrollViewRef = useRef(null)

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent
        const visibleOffset = contentOffset.y
        const visibleRange = visibleOffset + layoutMeasurement.height

        if (scraps && scraps.length > 0) {
            const visibleItems = scraps.reduce((acc, _, index) => {
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
                {scraps && scraps.length > 0 && scraps.map((scrap, index) => {
                    const row = Math.floor(index / 3)
                    if (rows.includes(row)) {
                        return (
                            <View key={scrap}>
                                {renderItem(scrap)}
                            </View>
                        )
                    }
                    else {
                        return (
                            <Image key={scrap} source={defaultImage} style={{
                                width: dimensions.width / 3,
                                height: dimensions.width / 3,
                            }} />
                        )
                    }
                })}
            </View>
        </ScrollView>
    )
}

export default ScrapList