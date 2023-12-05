import { View, Text } from 'react-native-ui-lib'
import { colors } from '../data/styles'
import React from 'react'

const ErrorComponent = ({ error }) => {
    return (
        <View style={{
            justifyContent: 'center',
        }}>
            <Text style={{
                paddingVertical: 4,
                fontFamily: 'itim',
                color: colors.textError,
                textAlign: 'center',
            }}>{error}</Text>
        </View>
    )
}

export default ErrorComponent