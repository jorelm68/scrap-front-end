import { Button, View, Colors } from 'react-native-ui-lib'
import { styles, colors } from '../data/styles'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const ButtonComponent = ({ label, size, onPress, width, icon, iconOnRight }) => {
    return (
        <View width={width}>
            <Button
                label={`${icon && !iconOnRight ? ' ' : ''}${label}${icon && iconOnRight ? ' ' : ''}`}
                labelStyle={{
                    color: colors.default,
                    fontFamily: styles.text1,
                }}
                size={size === 'large' ? Button.sizes.large : size === 'medium' ? Button.sizes.medium : size === 'small' ? Button.sizes.small : Button.sizes.xSmall}
                backgroundColor={colors.interaction}
                onPress={onPress}
                
                iconSource={() => <Ionicons name={icon} color={colors.default} size={18} />}
                iconOnRight={iconOnRight}
            />
        </View>
    )
}

export default ButtonComponent