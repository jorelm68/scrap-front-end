import { View, Text } from 'react-native-ui-lib'
import { colors, styles } from '../data/styles'
import React from 'react'

const ErrorComponent = ({ error }) => {
    return (
        <View style={{
            justifyContent: 'center',
        }}>
            <Text style={{
                paddingVertical: 4,
                fontFamily: styles.text1,
                color: colors.error,
                textAlign: 'center',
            }}>{error}</Text>
        </View>
    )
}

export default ErrorComponent