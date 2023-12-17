import { TextField, View, Text } from 'react-native-ui-lib'
import { colors, styles } from '../data/styles'
import React from 'react'

const FieldComponent = ({ placeholder, onChangeText, width, textAlign, value, maxLength, autoCapitalize, autoCorrect, autoComplete }) => {
    return (
        <View width={width}>
            <TextField
                placeholder={placeholder}
                placeholderTextColor={colors.dimmed}
                centered={textAlign === 'center'}
                containerStyle={{
                    width: '100%',
                    height: 40,
                    borderWidth: 1,
                    borderColor: colors.default,
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
                    color: colors.default,
                }}
                onChangeText={onChangeText}
                value={value}
                maxLength={maxLength}
            />
        </View>
    )
}

export default FieldComponent