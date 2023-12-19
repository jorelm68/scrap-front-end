import { TextField, View, Text } from 'react-native-ui-lib'
import { colors, palette, styles } from '../data/styles'
import React from 'react'

const FieldComponent = ({ placeholder, onChangeText, width, textAlign, value, maxLength, autoCapitalize, autoCorrect, autoComplete }) => {
    return (
        <View width={width}>
            <TextField
                placeholder={placeholder}
                placeholderTextColor={palette.secondary10}
                centered={textAlign === 'center'}
                containerStyle={{
                    width: '100%',
                    height: 40,
                    borderWidth: 1,
                    borderColor: palette.black,
                    borderRadius: 16,
                    justifyContent: 'center',
                }}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                autoComplete={autoComplete}
                style={{
                    paddingHorizontal: 8,
                    fontFamily: styles.text1,
                    height: 40,
                    color: palette.black,
                }}
                onChangeText={onChangeText}
                value={value}
                maxLength={maxLength}
            />
        </View>
    )
}

export default FieldComponent