import { View, Text, Image } from 'react-native-ui-lib'
import { ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { offlineGetScraps } from '../../data/offline'
import { dimensions, palette } from '../../data/styles'
import { useFocusEffect, useRouter } from 'expo-router'

const OfflineLibrary = () => {
    const [scraps, setScraps] = useState([])
    const router = useRouter()
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

    const getScraps = async () => {
        const scraps = await offlineGetScraps()
        setScraps(scraps)
    }

    useFocusEffect(() => {
        getScraps()
    });

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
                            <TouchableOpacity key={index} style={{
                                width: dimensions.width / 3,
                                height: dimensions.width / 3,
                            }} onPress={() => {
                                router.navigate({
                                    pathname: '/offlineEditScrap',
                                    params: {
                                        index: JSON.stringify(index),
                                    }
                                })
                            }}>
                                <Image source={scrap.iPrograph} style={{
                                    width: dimensions.width / 3,
                                    height: dimensions.width / 3,
                                }} />
                                <Image width={dimensions.width / 9} height={dimensions.width / 9} source={scrap.iRetrograph} style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    borderBottomLeftRadius: 8,
                                    borderTopLeftRadius: 8,
                                    borderBottomRightRadius: 8,
                                    width: dimensions.width / 9,
                                    height: dimensions.width / 9,
                                }} />
                            </TouchableOpacity>
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

export default OfflineLibrary