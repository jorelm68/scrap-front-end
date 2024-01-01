import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, router } from 'expo-router'
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib'
import MapView, { Polyline, Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import { dimensions, fonts } from '../data/styles'
import cache from '../data/cache'
import api from '../data/api'
import utility from '../data/utility'
import Button from '../components/Button'
import DropDown from '../components/DropDown'
import regex from '../data/regex'
import error from '../data/error'

const Screen = ({ index }) => {
    const { paused, setPaused, palette } = useContext(AppContext)
    const [scraps, setScraps] = useState([])
    const [reverse, setReverse] = useState(false)

    const getScraps = async () => {
        const scraps = await utility.offlineGetScraps()
        setScraps(scraps)
    }
    useEffect(() => {
        getScraps()
    }, [])

    const toggleDirection = () => {
        setReverse(!reverse)
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} style={{
                width: dimensions.width,
                height: dimensions.height,
                backgroundColor: palette.color1,
            }}>
                {scraps && scraps[index] && (
                    <View>
                        <DropDown
                            type='Text'
                            title='Title:'
                            value={scraps[index].title}
                            boxes={[
                                {
                                    placeholder: 'New Title',
                                    regex: regex.scrap.title,
                                    error: error.scrap.title,
                                    autoCorrect: true,
                                    autoCapitalize: 'words',
                                }
                            ]}
                            onSubmit={async (values) => {
                                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                setPaused(true)
                                const response = await utility.offlineEdit(index, 'title', values[0])
                                if (response.success) {
                                    getScraps()
                                }
                                setPaused(false)
                                return response
                            }}
                        />
                        <DropDown
                            type='Text'
                            title='Description:'
                            value={scraps[index].description}
                            boxes={[
                                {
                                    placeholder: 'New Description',
                                    initial: scraps[index].description,
                                    regex: regex.scrap.description,
                                    error: error.scrap.description,
                                    autoCorrect: true,
                                    autoCapitalize: 'sentences',
                                }
                            ]}
                            onSubmit={async (values) => {
                                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                setPaused(true)
                                const response = await utility.offlineEdit(index, 'description', values[0])
                                if (response.success) {
                                    getScraps()
                                }
                                setPaused(false)
                                return response
                            }}
                        />
                        <DropDown
                            type='Text'
                            title='Place:'
                            value={scraps[index].place}
                            boxes={[
                                {
                                    placeholder: 'New Place',
                                    initial: scraps[index].place,
                                    regex: regex.scrap.place,
                                    error: error.scrap.place,
                                    autoCorrect: true,
                                    autoCapitalize: 'words',
                                }
                            ]}
                            onSubmit={async (values) => {
                                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                setPaused(true)
                                const response = await utility.offlineEdit(index, 'place', values[0])
                                if (response.success) {
                                    getScraps()
                                }
                                setPaused(false)
                                return response
                            }}
                        />

                        <TouchableWithoutFeedback onPress={toggleDirection}>
                            <View style={{
                                marginVertical: 16,
                            }} >
                                <Image source={reverse ? scraps[index].iRetrograph : scraps[index].iPrograph} style={{
                                    width: dimensions.width,
                                    height: dimensions.width,
                                    borderRadius: 8,
                                }} />

                                <Image source={reverse ? scraps[index].iPrograph : scraps[index].iRetrograph} style={{
                                    position: 'absolute',
                                    width: dimensions.width / 3,
                                    height: dimensions.width / 3,
                                    borderRadius: 8,
                                    right: 0,
                                }} />
                            </View>
                        </TouchableWithoutFeedback>

                        <View center style={{
                            marginVertical: 16,
                        }}>
                            <Button
                                label='Delete Scrap'
                                icon='trash'
                                onPress={async () => {
                                    if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                    setPaused(true)
                                    const response = await utility.offlineDeleteScrap(index)
                                    if (response.success) {
                                        router.back()
                                    }
                                    setPaused(false)
                                    return response
                                }}
                            />
                        </View>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Screen