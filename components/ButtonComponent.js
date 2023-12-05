import { Button, View, Colors } from 'react-native-ui-lib'
import { styles, colors } from '../data/styles'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const ButtonComponent = ({ label, size, onPress, icon, width, iconOnRight }) => {
    return (
        <View width={width}>
            <Button
                label={`${icon && !iconOnRight ? ' ' : ''}${label}${icon && iconOnRight ? ' ' : ''}`}
                labelStyle={{
                    color: colors.button1Text,
                    fontFamily: 'itim',
                }}
                size={size === 'large' ? Button.sizes.large : size === 'medium' ? Button.sizes.medium : size === 'small' ? Button.sizes.small : Button.sizes.xSmall}
                backgroundColor={colors.button1}
                onPress={onPress}
                width={width}
                iconSource={() => <Ionicons name={icon} color={colors.button1Text} size={18} />}
                iconOnRight={iconOnRight}
            />
        </View>
    )
}

export default ButtonComponent