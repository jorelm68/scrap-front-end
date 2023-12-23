import { View, Text } from 'react-native-ui-lib'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { dimensions } from '../data/styles'
import { useRouter } from 'expo-router'
import AppContext from '../context/AppContext'

const BlankBookComponent = ({ book }) => {
    const { palette } = useContext(AppContext)
    const router = useRouter()
    return (
        <View style={{
            marginBottom: 4,
            paddingHorizontal: 4,
        }}>
            <TouchableOpacity onPress={() => {
                router.push({
                    pathname: '/book',
                    params: {
                        book,
                        page: JSON.stringify(scraps.indexOf(representative))
                    }
                })
            }}>
                <View row style={{
                    width: (dimensions.width - 8),
                    height: (dimensions.width - 8) / 4,
                }}>
                    <View style={{
                        width: (dimensions.width - 8) / 4,
                        height: (dimensions.width - 8) / 4,
                        borderRadius: 8,
                        backgroundColor: palette.color2,
                    }} />

                    <View center style={{
                        width: (dimensions.width - 8) / 2,
                        height: (dimensions.width - 8) / 4,
                    }}>
                        <ActivityIndicator size='small' color={palette.color6} />
                    </View>

                    <View center style={{
                        width: (dimensions.width - 8) / 4,
                        height: (dimensions.width - 8) / 4,
                        backgroundColor: palette.color2,
                        borderRadius: 8,

                    }} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default BlankBookComponent