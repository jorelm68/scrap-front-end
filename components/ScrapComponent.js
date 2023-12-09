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

    return (
        <View center>
            <Image width={100} height={100} source={iRetrograph} />
            <Image width={100} height={100} source={iPrograph} />
        </View>
    )
}

export default ScrapComponent