import { View, Text } from 'react-native-ui-lib'
import React from 'react'
import { palette, fonts } from '../data/styles'

const LogoComponent = () => {
    return (
        <View style={{ marginBottom: 24 }}>
            <Text style={{
                fontFamily: fonts.jockeyOne,
                fontSize: 48,
                color: palette.color5,
            }}>Scrap</Text>
        </View>
    )
}

export default LogoComponent