import { View, Text } from 'react-native-ui-lib'
import { Alert, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { offlineDeleteScrap, offlineEdit, offlineGetScraps } from '../data/offline'
import { dimensions, palette } from '../data/styles'
import DropDownComponent from '../components/DropDownComponent'
import { regexScrapDescription, regexScrapPlace, regexScrapTitle } from '../data/regex'
import { errorScrapDescription, errorScrapPlace, errorScrapTitle } from '../data/error'
import ButtonComponent from '../components/ButtonComponent'

const OfflineEditScrap = () => {
    const params = useLocalSearchParams()
    const index = JSON.parse(params.index)
    const router = useRouter()

    const [scraps, setScraps] = useState([])


    const getScraps = async () => {
        const scraps = await offlineGetScraps()
        setScraps(scraps)
    }
    useEffect(() => {
        getScraps()
    }, [])

    return (
        <KeyboardAvoidingView behavior="padding" style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ScrollView showsVerticalScrollIndicator={false}  keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} style={{
                width: dimensions.width,
                height: dimensions.height,
                backgroundColor: palette.color1,
            }}>
                {scraps && scraps[index] && (
                    <View>
                        <DropDownComponent
                            type='Text'
                            title='Title:'
                            value={scraps[index].title}
                            boxes={[
                                {
                                    placeholder: 'New Title',
                                    regex: regexScrapTitle,
                                    error: errorScrapTitle,
                                    autoCorrect: true,
                                    autoCapitalize: 'words',
                                }
                            ]}
                            onSubmit={async (values) => {
                                const response = await offlineEdit(index, 'title', values[0])
                                if (response.success) {
                                    getScraps()
                                }
                                return response
                            }}
                        />
                        <DropDownComponent
                            type='Text'
                            title='Description:'
                            value={scraps[index].description}
                            boxes={[
                                {
                                    placeholder: 'New Description',
                                    initial: scraps[index].description,
                                    regex: regexScrapDescription,
                                    error: errorScrapDescription,
                                    autoCorrect: true,
                                    autoCapitalize: 'sentences',
                                }
                            ]}
                            onSubmit={async (values) => {
                                const response = await offlineEdit(index, 'description', values[0])
                                if (response.success) {
                                    getScraps()
                                }
                                return response
                            }}
                        />
                        <DropDownComponent
                            type='Text'
                            title='Place:'
                            value={scraps[index].place}
                            boxes={[
                                {
                                    placeholder: 'New Place',
                                    initial: scraps[index].place,
                                    regex: regexScrapPlace,
                                    error: errorScrapPlace,
                                    autoCorrect: true,
                                    autoCapitalize: 'words',
                                }
                            ]}
                            onSubmit={async (values) => {
                                const response = await offlineEdit(index, 'place', values[0])
                                if (response.success) {
                                    getScraps()
                                }
                                return response
                            }}
                        />

                        <View center style={{
                            marginVertical: 16,
                        }}>
                            <ButtonComponent
                                label='Delete Scrap'
                                icon='trash'
                                onPress={async () => {
                                    const response = await offlineDeleteScrap(index)
                                    if (response.success) {
                                        router.back()
                                    }
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

export default OfflineEditScrap