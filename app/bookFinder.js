import { View, Text } from 'react-native-ui-lib'
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import AppContext from '../context/AppContext'
import { dimensions, fonts, palette } from '../data/styles'
import { Ionicons } from '@expo/vector-icons'
import FieldComponent from '../components/FieldComponent'
import BookComponent from '../components/BookComponent'
import { utilityBookSearch } from '../data/api'

const BookFinder = () => {
    const navigation = useNavigation()
    const router = useRouter()
    const { functions, user } = useContext(AppContext)
    const params = useLocalSearchParams()
    const threads = JSON.parse(params.threads)
    const amount = JSON.parse(params.amount)
    const functionName = params.functionName
    const onSubmit = functions[functionName]

    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [selection, setSelection] = useState([])

    const sendQuery = async () => {
        Keyboard.dismiss()
        response = await utilityBookSearch(user, query)
        if (!response.success) {
            Alert.alert('Error', response.error)
        }
        else {
            setResults(response.data.books.filter((book) => {
                return !threads.includes(book)
            }))
        }
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
                    <Ionicons name='checkmark' color={palette.secondary14} size={24} />
                </TouchableOpacity>
            ),
        })
    }, [navigation, selection])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{
                backgroundColor: palette.secondary11,
                width: dimensions.width,
                height: dimensions.height,
            }}>
                <View centerH row style={{
                    marginVertical: 16,
                    width: dimensions.width,
                    height: 48,
                }}>
                    <FieldComponent
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
                            <Ionicons name='search' color={palette.secondary14} size={24} />
                        </View>
                    </TouchableOpacity>
                </View>

                {results && results.map((book) => {
                    return (
                        <TouchableOpacity key={book} onPress={() => {
                            toggleSelect(book)
                        }} >
                            <View style={selection.includes(book) ? {
                                opacity: 0.5,
                            } : {
                                opacity: 1,
                            }}>
                                <BookComponent book={book} clickable={false} />
                                {selection.includes(book) && (
                                    <Text style={{
                                        position: 'absolute',
                                        fontSize: 45,
                                        color: palette.complement4,
                                        fontFamily: fonts.playBold,
                                        bottom: 4,
                                        right: 4,
                                    }}>{selection.indexOf(book) + 1}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default BookFinder