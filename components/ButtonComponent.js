import { Button, View, Colors } from 'react-native-ui-lib'
import { fonts, palette } from '../data/styles'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const ButtonComponent = ({ label, size, onPress, width, icon, iconOnRight }) => {
    return (
        <View width={width}>
            <Button
                label={`${icon && !iconOnRight ? ' ' : ''}${label}${icon && iconOnRight ? ' ' : ''}`}
                labelStyle={{
                    color: palette.secondary11,
                    fontFamily: fonts.itim,
                }}
                size={size === 'large' ? Button.sizes.large : size === 'medium' ? Button.sizes.medium : size === 'small' ? Button.sizes.small : Button.sizes.xSmall}
                backgroundColor={palette.complement4}
                onPress={onPress}
                
                iconSource={() => <Ionicons name={icon} color={palette.secondary11} size={18} />}
                iconOnRight={iconOnRight}
            />
        </View>
    )
}

export default ButtonComponent