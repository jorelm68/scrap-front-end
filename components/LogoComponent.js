import { View, Text } from 'react-native-ui-lib'
import React from 'react'
import { styles } from '../data/styles'

const LogoComponent = () => {
    return (
        <View style={{ marginBottom: 24 }}>
            <Text style={{
                fontFamily: styles.text2,
                fontSize: 48,
            }}>Scrap</Text>
        </View>
    )
}

export default LogoComponent