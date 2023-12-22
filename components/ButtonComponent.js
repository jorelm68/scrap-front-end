import { Button, Text, View } from 'react-native-ui-lib'
import { fonts, palette } from '../data/styles'
import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const ButtonComponent = ({ label, onPress, icon }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View center row style={{
                borderWidth: 1,
                borderColor: palette.color6,
                borderRadius: 24,
                paddingHorizontal: 8,
                paddingVertical: 4,
            }}>
                <Ionicons name={icon} color={palette.color6} size={24} />
                <Text style={{
                    fontFamily: fonts.itim,
                    fontSize: 12,
                    marginLeft: 2,
                    color: palette.color6,
                }}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonComponent