import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, router } from 'expo-router'
import ScrapSmall from '../components/ScrapSmall'
import { Ionicons } from '@expo/vector-icons'
import { Alert, ScrollView } from 'react-native'
import { dark, dimensions, fonts } from '../data/styles'
import AppContext from '../context/AppContext'
import ScrapList from '../components/ScrapList'

const Screen = ({ scraps = [], amount = 0, functionName = '' }) => {
    const navigation = useNavigation()
    const { functions, palette } = useContext(AppContext)
    const onSubmit = functions[functionName]
    const [selection, setSelection] = useState([])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={async () => {
                    onSubmit(selection)
                    router.back()
                }}>
                    <Ionicons name='checkmark' color={dark.color6} size={24} />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    router.back()
                }}>
                    <Ionicons name='chevron-down' color={dark.color6} size={24} />
                </TouchableOpacity>
            ),
        })
    }, [navigation, selection])

    const toggleSelect = async (scrap) => {
        if (selection.includes(scrap)) {
            setSelection((prevSelection) => [
                ...prevSelection.filter((value) => {
                    return value !== scrap
                })
            ])
        }
        else {
            if (selection.length === amount) {
                setSelection((prevSelection) => [
                    ...prevSelection.slice(1),
                    scrap,
                ])
            }
            else {
                setSelection((prevSelection) => [
                    ...prevSelection,
                    scrap,
                ])
            }
        }
    }

    return (
        <ScrapList
            scraps={scraps}
            renderItem={(scrap) => {
                return (
                    <TouchableOpacity key={scrap} onPress={() => {
                        toggleSelect(scrap)
                    }}>
                        <View style={selection.includes(scrap) ? {
                            opacity: 0.5,
                        } : {
                            opacity: 1,
                        }}>
                            <ScrapSmall scrap={scrap} />
                        </View>
                        {selection.includes(scrap) && (
                            <Text style={{
                                position: 'absolute',
                                fontSize: 45,
                                color: palette.accent,
                                fontFamily: fonts.playBold,
                                bottom: 4,
                                right: 4,
                            }}>{selection.indexOf(scrap) + 1}</Text>
                        )}
                    </TouchableOpacity>
                )
            }}
        />
    )
}

export default Screen