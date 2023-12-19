import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
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
import { colors, dimensions, palette } from '../data/styles'

const EditBook = () => {
    const router = useRouter()
    const { user, setFunctions } = useContext(AppContext)
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
            changeScrapsInBook: async (selection) => {
                for (const scrap of selection) {
                    const response = await bookAddScrap(book, scrap)
                    if (!response.success) {
                        Alert.alert('Error', 'Couldn\'t add scraps to book')
                        return response
                    }
                }

                setScraps((prevScraps) => ([
                    ...prevScraps,
                    ...selection,
                ]))

                cache.filter([book, 'scraps'])
                cache.filter([book, 'unbookedScraps'])
                return {
                    success: true,
                }
            },
            changeRepresentative: async (selection) => {
                const response = await edit('Book', book, 'representative', selection[0])
                if (response.success) {
                    setRepresentative(selection[0])
                }

                cache.filter([book, 'scraps'])
                return response
            },
        }))
    }, [])

    const handleRemoveScrap = async (scrap) => {
        const response = await bookRemoveScrap(book, scrap)
        if (response.success) {
            setScraps((prevScraps) => ([
                ...prevScraps.filter((value) => {
                    return value !== scrap
                })
            ]))
        }

        cache.filter([book, 'scraps'])
        cache.filter([book, 'unbookedScraps'])

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

        return response
    }

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.secondary11,
        }}>
            <View center style={{
                marginVertical: 16,
            }}>
                <SwitchComponent title={'Public? '} value={isPublic} onSwitch={async () => {
                    const response = await edit('Book', book, 'isPublic', !isPublic)
                    if (response.success) {
                        cache.filter([book, 'isPublic'])
                        cache.filter([user, 'books'])
                        cache.filter([user, 'publicBooks'])
                        setIsPublic(!isPublic)
                    }
                }} />
            </View>

            <DropDownComponent
                type='Text'
                title='Title:'
                value={title}
                boxes={[
                    {
                        placeholder: 'New Title',
                        regex: regexBookTitle,
                        error: errorBookTitle,
                        autoCorrect: true,
                        autoCapitalize: 'words',
                    }
                ]}
                onSubmit={async (values) => {
                    const response = await edit('Book', book, 'title', values[0])
                    if (response.success) {
                        cache.filter([book, 'title'])
                        setTitle(values[0])
                    }
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
                        regex: regexBookDescription,
                        error: errorBookDescription,
                        autoCorrect: true,
                        autoCapitalize: 'sentences',
                    }
                ]}
                onSubmit={async (values) => {
                    const response = await edit('Book', book, 'description', values[0])
                    if (response.success) {
                        cache.filter([book, 'description'])
                        setDescription(values[0])
                    }
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
                    router.push({
                        pathname: '/scrapPicker', params: {
                            scraps: JSON.stringify(scraps ? scraps : []),
                            amount: JSON.stringify(1),
                            functionName: 'changeRepresentative',
                        }
                    })
                }}
            />

            {scraps.length < 10 && (
                <View center style={{
                    marginVertical: 16,
                }}>
                    <ButtonComponent
                        label='Add Scraps'
                        size='large'
                        onPress={() => {
                            router.push({
                                pathname: '/scrapPicker', params: {
                                    scraps: JSON.stringify(unbookedScraps.filter((value) => {
                                        return !scraps || !scraps.includes(value)
                                    })),
                                    amount: JSON.stringify(10 - scraps.length),
                                    functionName: 'changeScrapsInBook',
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

        </View>

    )
}

export default EditBook