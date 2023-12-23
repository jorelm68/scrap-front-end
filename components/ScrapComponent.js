import { View, Text, Image } from 'react-native-ui-lib'
import React from 'react'
import useScrap from '../hooks/useScrap'
import { dimensions } from '../data/styles'

const ScrapComponent = ({ scrap }) => {
    const {
        iPrograph,
        iRetrograph,
    } = useScrap(scrap, [
        'iPrograph->270',
        'iRetrograph->270'
    ])

    return (
        <View>
            <Image source={iPrograph} style={{
                width: dimensions.width / 3,
                height: dimensions.width / 3,
            }}/>
            <Image width={dimensions.width / 9} height={dimensions.width / 9} source={iRetrograph} style={{
                position: 'absolute',
                right: 0,
                top: 0,
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 8,
                borderBottomRightRadius: 8,
                width: dimensions.width / 9,
                height: dimensions.width / 9,
            }}/>
        </View>
    )
}

export default ScrapComponent