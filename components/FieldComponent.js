import { TextField, View, Text } from 'react-native-ui-lib'
import { palette, fonts } from '../data/styles'
import React from 'react'

const FieldComponent = ({ placeholder, onChangeText, width, textAlign, value, maxLength, autoCapitalize, autoCorrect, autoComplete, secureTextEntry }) => {
    return (
        <View width={width}>
            <TextField
                placeholder={placeholder}
                placeholderTextColor={palette.color4}
                centered={textAlign === 'center'}
                containerStyle={{
                    width: '100%',
                    height: 40,
                    borderWidth: 1,
                    borderColor: palette.color5,
                    borderRadius: 16,
                    justifyContent: 'center',
                }}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                autoComplete={autoComplete}
                secureTextEntry={secureTextEntry}
                style={{
                    paddingHorizontal: 8,
                    fontFamily: fonts.itim,
                    height: 40,
                    color: palette.color5,
                }}
                onChangeText={onChangeText}
                value={value}
                maxLength={maxLength}
            />
        </View>
    )
}

export default FieldComponent