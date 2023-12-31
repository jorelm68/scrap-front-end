import { View, Text } from 'react-native-ui-lib'
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useLocalSearchParams, useNavigation, router } from 'expo-router'
import AppContext from '../context/AppContext'
import { dark, dimensions, fonts } from '../data/styles'
import { Ionicons } from '@expo/vector-icons'
import Field from '../components/Field'
import BookSmall from '../components/BookSmall'
import api from '../data/api'
import BookList from '../components/BookList'

const Screen = ({ book = '', threads = [], amount = 0, functionName = '' }) => {
    const navigation = useNavigation()
    const { functions, user, paused, setPaused, palette } = useContext(AppContext)
    const onSubmit = functions[functionName]
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [selection, setSelection] = useState([])
    const sendQuery = async () => {
        if (paused) return { success: false, error: 'Please don\'t click too fast' }
        setPaused(true)
        Keyboard.dismiss()
        response = await api.utility.bookSearch(user, query, ['restrictedBooks'])
        if (!response.success) {
            Alert.alert('Error', response.error)
        }
        else {
            // Filter out the books that are already threaded and the book the scrap belongs to
            setResults(response.data.books.filter((value) => {
                return !threads.includes(value) && value !== book
            }))
        }
        setPaused(false)
    }

    const toggleSelect = async (book) => {
        if (selection.includes(book)) {
            setSelection((prevSelection) => [
                ...prevSelection.filter((value) => {
                    return value !== book
                })
            ])
        }
        else {
            if (selection.length === amount) {
                setSelection((prevSelection) => [
                    ...prevSelection.slice(1),
                    book,
                ]);
            }
            else {
                setSelection((prevSelection) => [
                    ...prevSelection,
                    book,
                ])
            }
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={async () => {
                    onSubmit(selection)
                    router.back()
                }}>
                    <Ionicons name='checkmark-circle' color={dark.color6} size={24} />
                </TouchableOpacity>
            ),
        })
    }, [navigation, selection])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{
                backgroundColor: palette.color1,
                width: dimensions.width,
                height: dimensions.height,
            }}>
                <BookList
                    header={() => {
                        return (
                            <View centerH row style={{
                                marginVertical: 16,
                                width: dimensions.width,
                                height: 48,
                            }}>
                                <Field
                                    placeholder='Search...'
                                    width={dimensions.width * (7 / 10)}
                                    value={query}
                                    onChangeText={(value) => {
                                        setQuery(value)
                                    }}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    autoComplete='off'
                                />

                                <TouchableOpacity onPress={sendQuery} style={{
                                    width: dimensions.width * (1 / 10),
                                    height: dimensions.width * (1 / 10),
                                }}>
                                    <View center style={{
                                        width: dimensions.width * (1 / 10),
                                        height: dimensions.width * (1 / 10),
                                    }}>
                                        <Ionicons name='search' color={palette.color6} size={24} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    headerHeight={48}
                    books={results}
                    renderItem={(book) => {
                        return (
                            <TouchableOpacity key={book} onPress={() => {
                                toggleSelect(book)
                            }} >
                                <View style={selection.includes(book) ? {
                                    opacity: 0.5,
                                } : {
                                    opacity: 1,
                                }}>
                                    <BookSmall book={book} showAuthor />
                                </View>
                                {selection.includes(book) && (
                                    <Text style={{
                                        position: 'absolute',
                                        fontSize: 45,
                                        color: palette.accent,
                                        fontFamily: fonts.playBold,
                                        bottom: 4,
                                        right: 4,
                                    }}>{selection.indexOf(book) + 1}</Text>
                                )}
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Screen