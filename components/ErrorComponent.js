import { View, Text } from 'react-native-ui-lib'
import { palette, fonts } from '../data/styles'
import React from 'react'

const ErrorComponent = ({ error }) => {
    return (
        <View style={{
            justifyContent: 'center',
        }}>
            <Text style={{
                paddingVertical: 4,
                fontFamily: fonts.itim,
                color: palette.complement2,
                textAlign: 'center',
            }}>{error}</Text>
        </View>
    )
}

export default ErrorComponent