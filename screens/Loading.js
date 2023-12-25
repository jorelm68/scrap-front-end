import { View } from 'react-native-ui-lib'
import React, { useContext } from 'react'
import { dimensions } from '../data/styles'
import Logo from '../components/Logo'
import { ActivityIndicator } from 'react-native'
import AppContext from '../context/AppContext'

const Screen = () => {
    const { palette } = useContext(AppContext)
    return (
        <View flex center style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
        }}>
            <Logo />
            <ActivityIndicator size='large' color={palette.color5} />
        </View>
    )
}

export default Screen