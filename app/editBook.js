import { View, Text } from 'react-native-ui-lib'
import { TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import DropDownComponent from '../components/DropDownComponent'
import useScrap from '../hooks/useScrap'
import { errorBookDescription, errorBookTitle, errorScrapDescription, errorScrapPlace, errorScrapTitle } from '../data/error'
import { regexBookDescription, regexBookTitle, regexScrapDescription, regexScrapPlace, regexScrapTitle } from '../data/regex'
import { edit } from '../data/utility'
import useBook from '../hooks/useBook'
import SwitchComponent from '../components/SwitchComponent'
import AppContext from '../context/AppContext'
import ButtonComponent from '../components/ButtonComponent'
import ScrapComponent from '../components/ScrapComponent'
import { bookAddScrap, bookRemoveScrap } from '../data/api'
import useAuthor from '../hooks/useAuthor'
import cache from '../data/cache'
import { Alert } from 'react-native'
import { dimensions, palette } from '../data/styles'

const EditBook = () => {
    const router = useRouter()
    const { user, setFunctions, paused, setPaused } = useContext(AppContext)
    const params = useLocalSearchParams()
    const book = params.book

    const {
        title,
        setTitle,
        description,
        setDescription,
        representative,
        setRepresentative,
        scraps,
        setScraps,
        isPublic,
        setIsPublic,
    } = useBook(book, [
        'title',
        'description',
        'representative',
        'scraps',
        'isPublic',
    ])

    const {
        unbookedScraps,
    } = useAuthor(user, [
        'unbookedScraps',
    ])

    useEffect(() => {
        setFunctions((prevFunctions) => ({
            ...prevFunctions,
            addScrapsToBook: async (selection) => {
                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                setPaused(true)
                for (const scrap of selection) {
                    const response = await bookAddScrap(book, scrap)
                    if (!response.success) {
                        Alert.alert('Error', response.error)
                        return
                    }
                }

                if (!representative) {
                    const response = await edit('Book', book, 'representative', selection[0])
                    if (response.success) {
                        setRepresentative(selection[0])
                        cache.filter([book, 'representative'])
                    }
                }

                setScraps((prevScraps) => ([
                    ...prevScraps,
                    ...selection,
                ]))

                cache.filter([book, 'scraps'])
                cache.filter([user, 'books'])
                cache.filter([user, 'profileBooks'])
                cache.filter([user, 'unbookedScraps'])
                cache.filter([book, 'miles'])
                cache.filter([book, 'Date'])

                for (const scrap of selection) {
                    cache.filter([scrap, 'book'])
                }

                setPaused(false)
                return {
                    success: true,
                }
            },
            changeRepresentative: async (selection) => {
                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                setPaused(true)
                const response = await edit('Book', book, 'representative', selection[0])
                if (response.success) {
                    setRepresentative(selection[0])
                }

                cache.filter([book, 'scraps'])

                setPaused(false)
                return response
            },
        }))
    }, [])

    const handleRemoveScrap = async (scrap) => {
        if (paused) return { success: false, error: 'Please don\'t click too fast' }
        setPaused(true)
        const response = await bookRemoveScrap(book, scrap)
        if (response.success) {
            setScraps((prevScraps) => ([
                ...prevScraps.filter((value) => {
                    return value !== scrap
                })
            ]))
        }

        cache.filter([book, 'scraps'])
        cache.filter([user, 'unbookedScraps'])
        cache.filter([user, 'books'])
        cache.filter([user, 'profileBooks'])
        cache.filter([scrap, 'book'])
        cache.filter([book, 'miles'])
        cache.filter([book, 'Date'])

        if (scrap === representative) {
            const firstOption = scraps[0]
            const secondOption = scraps[1]
            let value = undefined
            if (firstOption && firstOption !== scrap) {
                value = firstOption
            }
            else if (firstOption && firstOption === scrap) {
                value = secondOption
            }
            const response = await edit('Book', book, 'representative', value)
            if (response.success) {
                setRepresentative(value)
                cache.filter([book, 'representative'])
            }
        }

        setPaused(false)
        return response
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
                <View center style={{
                    marginVertical: 16,
                }}>
                    <SwitchComponent title={'Public? '} value={isPublic} onSwitch={async () => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await edit('Book', book, 'isPublic', !isPublic)
                        if (response.success) {
                            cache.filter([book, 'isPublic'])
                            cache.filter([user, 'books'])
                            cache.filter([user, 'publicBooks'])
                            setIsPublic(!isPublic)
                        }
                        setPaused(false)
                    }} />
                </View>

                <DropDownComponent
                    type='Text'
                    title='Title:'
                    value={title}
                    boxes={[
                        {
                            placeholder: 'New Title',
                            initial: title,
                            regex: regexBookTitle,
                            error: errorBookTitle,
                            autoCorrect: true,
                            autoCapitalize: 'words',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await edit('Book', book, 'title', values[0])
                        if (response.success) {
                            cache.filter([book, 'title'])
                            setTitle(values[0])
                        }

                        setPaused(false)
                        return response
                    }}
                />
                <DropDownComponent
                    type='Text'
                    title='Description:'
                    value={description}
                    boxes={[
                        {
                            placeholder: 'New Description',
                            initial: description,
                            regex: regexBookDescription,
                            error: errorBookDescription,
                            autoCorrect: true,
                            autoCapitalize: 'sentences',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await edit('Book', book, 'description', values[0])
                        if (response.success) {
                            cache.filter([book, 'description'])
                            setDescription(values[0])
                        }

                        setPaused(false)
                        return response
                    }}
                />

                <DropDownComponent
                    type='Scrap'
                    title='Representative:'
                    value={representative}
                    options={scraps}
                    amount={1}
                    onSubmit={() => {
                        router.navigate({
                            pathname: '/scrapPicker', params: {
                                scraps: JSON.stringify(scraps ? scraps : []),
                                amount: JSON.stringify(1),
                                functionName: 'changeRepresentative',
                            }
                        })
                    }}
                />

                {scraps.length < 5 && (
                    <View center style={{
                        marginVertical: 16,
                    }}>
                        <ButtonComponent
                            label='Add Scraps'
                            size='large'
                            onPress={() => {
                                router.navigate({
                                    pathname: '/scrapPicker', params: {
                                        scraps: JSON.stringify(unbookedScraps.filter((value) => {
                                            return !scraps || !scraps.includes(value)
                                        })),
                                        amount: JSON.stringify(5 - scraps.length),
                                        functionName: 'addScrapsToBook',
                                    }
                                })
                            }}
                            width='50%'
                        />
                    </View>
                )}

                <View style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}>
                    {scraps && scraps.map((scrap) => {
                        return (
                            <TouchableOpacity key={scrap} onPress={() => {
                                handleRemoveScrap(scrap)
                            }}>
                                <ScrapComponent scrap={scrap} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditBook