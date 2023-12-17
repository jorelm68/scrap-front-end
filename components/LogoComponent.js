import { View, Text } from 'react-native-ui-lib'
import React from 'react'
import { colors, styles } from '../data/styles'

const LogoComponent = () => {
    return (
        <View style={{ marginBottom: 24 }}>
            <Text style={{
                fontFamily: styles.text2,
                fontSize: 48,
                color: colors.default,
            }}>Scrap</Text>
        </View>
    )
}

export default LogoComponent