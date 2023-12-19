import { Button, View, Colors } from 'react-native-ui-lib'
import { styles, colors, palette } from '../data/styles'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const ButtonComponent = ({ label, size, onPress, width, icon, iconOnRight }) => {
    return (
        <View width={width}>
            <Button
                label={`${icon && !iconOnRight ? ' ' : ''}${label}${icon && iconOnRight ? ' ' : ''}`}
                labelStyle={{
                    color: palette.black,
                    fontFamily: styles.text1,
                }}
                size={size === 'large' ? Button.sizes.large : size === 'medium' ? Button.sizes.medium : size === 'small' ? Button.sizes.small : Button.sizes.xSmall}
                backgroundColor={palette.secondary00}
                onPress={onPress}
                
                iconSource={() => <Ionicons name={icon} color={palette.black} size={18} />}
                iconOnRight={iconOnRight}
            />
        </View>
    )
}

export default ButtonComponent