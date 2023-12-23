import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect } from 'react'
import { TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import DropDownComponent from '../components/DropDownComponent'
import useScrap from '../hooks/useScrap'
import { errorScrapDescription, errorScrapPlace, errorScrapTitle } from '../data/error'
import { regexScrapDescription, regexScrapPlace, regexScrapTitle } from '../data/regex'
import { edit } from '../data/utility'
import cache from '../data/cache'
import { dimensions } from '../data/styles'
import AppContext from '../context/AppContext'
import { utilityAddThread, utilityRemoveThread } from '../data/api'
import ButtonComponent from '../components/ButtonComponent'
import { Alert } from 'react-native'
import BookComponent from '../components/BookComponent'

const EditScrap = () => {
    const { user, setFunctions, paused, setPaused, palette } = useContext(AppContext)
    const router = useRouter()
    const { scrap } = useLocalSearchParams()
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
                    const response = await utilityAddThread(scrap, book)
                    if (!response.success) {
                        Alert.alert('Error', 'Couldn\'t thread book')
                        return response
                    }
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
        const response = await utilityRemoveThread(scrap, book)
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
                    <BookComponent book={book} />
                )}
                <DropDownComponent
                    type='Text'
                    title='Title:'
                    value={title}
                    boxes={[
                        {
                            placeholder: 'New Title',
                            initial: title,
                            regex: regexScrapTitle,
                            error: errorScrapTitle,
                            autoCorrect: true,
                            autoCapitalize: 'words',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await edit('Scrap', scrap, 'title', values[0])
                        if (response.success) {
                            cache.filter([scrap, 'title'])
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
                            regex: regexScrapDescription,
                            error: errorScrapDescription,
                            autoCorrect: true,
                            autoCapitalize: 'sentences',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await edit('Scrap', scrap, 'description', values[0])
                        if (response.success) {
                            cache.filter([scrap, 'description'])
                            setDescription(values[0])
                        }

                        setPaused(false)
                        return response
                    }}
                />
                <DropDownComponent
                    type='Text'
                    title='Place:'
                    value={place}
                    boxes={[
                        {
                            placeholder: 'New Place',
                            initial: place,
                            regex: regexScrapPlace,
                            error: errorScrapPlace,
                            autoCorrect: true,
                            autoCapitalize: 'words',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await edit('Scrap', scrap, 'place', values[0])
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
                        <ButtonComponent
                            label='Thread Books'
                            size='large'
                            onPress={() => {
                                router.navigate({
                                    pathname: '/bookFinder', params: {
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
                                <BookComponent book={book} showAuthor />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditScrap