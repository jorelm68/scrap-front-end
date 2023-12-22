import { View, Text, Image } from 'react-native-ui-lib'
import React, { useEffect, useState } from 'react'
import { offlineGetScraps } from '../../data/offline'
import { dimensions, palette } from '../../data/styles'
import { useFocusEffect } from 'expo-router'

const OfflineLibrary = () => {
    const [scraps, setScraps] = useState([])

    const getScraps = async () => {
        const scraps = await offlineGetScraps()
        setScraps(scraps)
    }

    useFocusEffect(() => {
        getScraps()
    });

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
        }}>
            {scraps && scraps.map((scrap, index) => {
                return (
                    <View key={index} style={{
                        width: dimensions.width / 3,
                        height: dimensions.width / 3,
                    }}>
                        <Image source={scrap.iPrograph} style={{
                            width: dimensions.width / 3,
                            height: dimensions.width / 3,
                        }} />
                        <Image width={100} height={100} source={scrap.iRetrograph} style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            borderBottomLeftRadius: 8,
                            borderTopLeftRadius: 8,
                            borderBottomRightRadius: 8,
                            width: dimensions.width / 9,
                            height: dimensions.width / 9,
                        }} />
                    </View>
                )
            })}
        </View>
    )
}

export default OfflineLibrary