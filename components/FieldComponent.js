import { TextField } from 'react-native-ui-lib'
import { colors } from '../data/styles'
import React from 'react'

const FieldComponent = ({ placeholder, onChangeText, value, centered, maxLength }) => {
    return (
        <TextField
            placeholder={placeholder}
            placeholderTextColor={colors.placeholderText}
            centered={centered}
            containerStyle={{
                width: '80%',
                height: 40,
                borderWidth: 1,
                borderColor: 'black', // Outline color
                borderRadius: 16,
                justifyContent: 'center',
            }}
            style={{
                marginLeft: centered ? 0 : 12,
            }}
            onChangeText={onChangeText}
            value={value}
            maxLength={maxLength}
        />
    )
}

export default FieldComponent