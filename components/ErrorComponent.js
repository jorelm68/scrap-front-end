import { View, Text } from 'react-native-ui-lib'
import { fonts } from '../data/styles'
import React, { useContext } from 'react'
import AppContext from '../context/AppContext'

const ErrorComponent = ({ error }) => {
    const { palette } = useContext(AppContext)
    return (
        <View style={{
            justifyContent: 'center',
        }}>
            <Text style={{
                paddingVertical: 4,
                fontFamily: fonts.itim,
                color: palette.color4,
                textAlign: 'center',
            }}>{error}</Text>
        </View>
    )
}

export default ErrorComponent