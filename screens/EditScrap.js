import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect } from 'react'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import { useLocalSearchParams, usePathname, router } from 'expo-router'
import DropDown from '../components/DropDown'
import useScrap from '../hooks/useScrap'
import error from '../data/error'
import regex from '../data/regex'
import cache from '../data/cache'
import { dimensions } from '../data/styles'
import AppContext from '../context/AppContext'
import utility from '../data/utility'
import Button from '../components/Button'
import BookSmall from '../components/BookSmall'
import api from '../data/api'

const Screen = ({ scrap }) => {
    const { setFunctions, paused, setPaused, palette } = useContext(AppContext)
    const tab = utility.getTab(usePathname())
    const {
        title,
        setTitle,
        description,
        setDescription,
        place,
        setPlace,
        threads,
        setThreads,
        book,
    } = useScrap(scrap, [
        'title',
        'description',
        'place',
        'threads',
        'book',
    ])

    useEffect(() => {
        setFunctions((prevFunctions) => ({
            ...prevFunctions,
            addThreadsToScrap: async (selection) => {
                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                setPaused(true)
                for (const book of selection) {
                    await api.utility.addThread(scrap, book)
                }

                setThreads((prevThreads) => ([
                    ...prevThreads,
                    ...selection,
                ]))

                cache.filter([scrap, 'threads'])

                for (const book of selection) {
                    cache.filter([book, 'threads'])
                }

                setPaused(false)
                return {
                    success: true,
                }
            },
        }))
    }, [])

    const handleRemoveThread = async (book) => {
        if (paused) return { success: false, error: 'Please don\'t click too fast' }
        setPaused(true)
        const response = await api.utility.removeThread(scrap, book)
        if (response.success) {
            setThreads((prevThreads) => ([
                ...prevThreads.filter((value) => {
                    return value !== book
                })
            ]))

            cache.filter([scrap, 'threads'])
            cache.filter([book, 'threads'])
        }

        setPaused(false)
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
                paddingTop: book ? 4 : 0,
            }}>
                {book && (
                    <BookSmall book={book} />
                )}
                <DropDown
                    type='Text'
                    title='Title:'
                    value={title}
                    boxes={[
                        {
                            placeholder: 'New Title',
                            initial: title,
                            regex: regex.scrap.title,
                            error: error.scrap.title,
                            autoCorrect: true,
                            autoCapitalize: 'words',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await utility.edit('Scrap', scrap, 'title', values[0])
                        if (response.success) {
                            cache.filter([scrap, 'title'])
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
                            regex: regex.scrap.description,
                            error: error.scrap.description,
                            autoCorrect: true,
                            autoCapitalize: 'sentences',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await utility.edit('Scrap', scrap, 'description', values[0])
                        if (response.success) {
                            cache.filter([scrap, 'description'])
                            setDescription(values[0])
                        }

                        setPaused(false)
                        return response
                    }}
                />
                <DropDown
                    type='Text'
                    title='Place:'
                    value={place}
                    boxes={[
                        {
                            placeholder: 'New Place',
                            initial: place,
                            regex: regex.scrap.place,
                            error: error.scrap.place,
                            autoCorrect: true,
                            autoCapitalize: 'words',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await utility.edit('Scrap', scrap, 'place', values[0])
                        if (response.success) {
                            cache.filter([scrap, 'place'])
                            setPlace(values[0])
                        }

                        setPaused(false)
                        return response
                    }}
                />

                {threads.length < 3 && (
                    <View center style={{
                        marginVertical: 16,
                    }}>
                        <Button
                            label='Thread Books'
                            size='large'
                            onPress={() => {
                                router.navigate({
                                    pathname: `/${tab}/book/findBooks`,
                                    params: {
                                        book,
                                        threads: JSON.stringify(threads),
                                        amount: JSON.stringify(3 - threads.length),
                                        functionName: 'addThreadsToScrap',
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
                    marginTop: threads && threads.length === 3 ? 8 : 0,
                }}>
                    {threads && threads.map((book) => {
                        return (
                            <TouchableOpacity key={book} onPress={() => {
                                handleRemoveThread(book)
                            }}>
                                <BookSmall book={book} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Screen