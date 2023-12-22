import { View } from 'react-native-ui-lib'
import React from 'react'
import { dimensions, palette } from '../data/styles'
import LogoComponent from '../components/LogoComponent'
import { ActivityIndicator } from 'react-native'

const Loading = () => {
    return (
        <View flex center style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.primary1,
        }}>
            <LogoComponent />
            <ActivityIndicator size='large' color={palette.primary4} />
        </View>
    )
}

export default Loading