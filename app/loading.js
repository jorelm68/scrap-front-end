import { Colors, View } from 'react-native-ui-lib'
import React from 'react'
import { dimensions, palette } from '../data/styles'
import LogoComponent from '../components/LogoComponent'
import { ActivityIndicator } from 'react-native'

const Loading = () => {
    return (
        <View flex center style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.secondary11,
        }}>
            <LogoComponent />
            <ActivityIndicator size='large' color={palette.secondary14} />
        </View>
    )
}

export default Loading