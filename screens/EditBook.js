import { View, Text } from 'react-native-ui-lib'
import { TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useLocalSearchParams, usePathname, router } from 'expo-router'
import DropDown from '../components/DropDown'
import useScrap from '../hooks/useScrap'
import error from '../data/error'
import regex from '../data/regex'
import utility from '../data/utility'
import useBook from '../hooks/useBook'
import Switch from '../components/Switch'
import AppContext from '../context/AppContext'
import Button from '../components/Button'
import ScrapSmall from '../components/ScrapSmall'
import api from '../data/api'
import useAuthor from '../hooks/useAuthor'
import cache from '../data/cache'
import { dimensions } from '../data/styles'

const Screen = ({ book }) => {
    const { user, setFunctions, paused, setPaused, palette } = useContext(AppContext)
    const tab = utility.getTab(usePathname())

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

                setScraps((prevScraps) => [
                    ...prevScraps,
                    ...selection,
                ])

                for (const scrap of selection) {
                    await api.book.addScrap(book, scrap)
                }

                if (!representative) {
                    const response = await utility.edit('Book', book, 'representative', selection[0])
                    if (response.success) {
                        setRepresentative(selection[0])
                        cache.filter([book, 'representative'])
                    }
                }

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
                const response = await utility.edit('Book', book, 'representative', selection[0])
                if (response.success) {
                    setRepresentative(selection[0])
                    cache.filter([book, 'representative'])
                }

                cache.filter([book, 'scraps'])

                setPaused(false)
                return response
            },
        }))
    }, [representative, unbookedScraps, scraps])

    const handleRemoveScrap = async (scrap) => {
        if (paused) return { success: false, error: 'Please don\'t click too fast' }
        setPaused(true)

        setScraps((prevScraps) => ([
            ...prevScraps.filter((value) => {
                return value !== scrap
            })
        ]))

        const response = await api.book.removeScrap(book, scrap)

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
            const response = await utility.edit('Book', book, 'representative', value)
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
                    <Switch title={'Public? '} value={isPublic} onSwitch={async () => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await utility.edit('Book', book, 'isPublic', !isPublic)
                        if (response.success) {
                            cache.filter([book, 'isPublic'])
                            cache.filter([user, 'books'])
                            cache.filter([user, 'publicBooks'])
                            setIsPublic(!isPublic)
                        }
                        setPaused(false)
                    }} />
                </View>

                <DropDown
                    type='Text'
                    title='Title:'
                    value={title}
                    boxes={[
                        {
                            placeholder: 'New Title',
                            initial: title,
                            regex: regex.book.title,
                            error: error.book.title,
                            autoCorrect: true,
                            autoCapitalize: 'words',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await utility.edit('Book', book, 'title', values[0])
                        if (response.success) {
                            cache.filter([book, 'title'])
                            setTitle(values[0])
                        }

                        setPaused(false)
                        return response
                    }}
                />
                <DropDown
                    type='Text'
                    title='Description:'
                    value={description}
                    boxes={[
                        {
                            placeholder: 'New Description',
                            initial: description,
                            regex: regex.book.description,
                            error: error.book.description,
                            autoCorrect: true,
                            autoCapitalize: 'sentences',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await utility.edit('Book', book, 'description', values[0])
                        if (response.success) {
                            cache.filter([book, 'description'])
                            setDescription(values[0])
                        }

                        setPaused(false)
                        return response
                    }}
                />

                <DropDown
                    type='Scrap'
                    title='Representative:'
                    value={representative}
                    options={scraps.filter((scrap) => {
                        return scrap !== representative
                    })}
                    amount={1}
                    onSubmit={() => {
                        router.navigate({
                            pathname: `/${tab}/book/chooseScraps`,
                            params: {
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
                        <Button
                            label='Add Scraps'
                            size='large'
                            onPress={() => {
                                cache.filter([user, 'unbookedScraps'])
                                router.navigate({
                                    pathname: `/${tab}/book/chooseScraps`,
                                    params: {
                                        scraps: JSON.stringify(unbookedScraps.filter((value) => {
                                            return !scraps.includes(value)
                                        })),
                                        amount: JSON.stringify(10 - scraps.length),
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
                                <ScrapSmall scrap={scrap} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Screen