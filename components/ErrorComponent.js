import { View, Text } from 'react-native-ui-lib'
import { colors, palette, styles } from '../data/styles'
import React from 'react'

const ErrorComponent = ({ error }) => {
    return (
        <View style={{
            justifyContent: 'center',
        }}>
            <Text style={{
                paddingVertical: 4,
                fontFamily: styles.text1,
                color: palette.complement2,
                textAlign: 'center',
            }}>{error}</Text>
        </View>
    )
}

export default ErrorComponent