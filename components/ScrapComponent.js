import { View, Text, Image } from 'react-native-ui-lib'
import React from 'react'
import useScrap from '../hooks/useScrap'
import { dimensions } from '../data/styles'

const ScrapComponent = ({ scrap }) => {
    const {
        iPrograph,
        iRetrograph,
    } = useScrap(scrap, [
        'iPrograph->1080',
        'iRetrograph->1080'
    ])
    console.log(scrap)

    return (
        <View center>
            <Image width={dimensions.width / 3} height={dimensions.width / 3} source={iRetrograph} />
            <Image width={dimensions.width} height={dimensions.width} source={iPrograph} />
        </View>
    )
}

export default ScrapComponent