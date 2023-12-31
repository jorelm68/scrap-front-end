import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { dark, dimensions, fonts } from '../data/styles'
import AppContext from '../context/AppContext'
import BookSmall from '../components/BookSmall'
import BookList from '../components/BookList'

const Screen = ({ books, amount, functionName }) => {
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

    return (
        <BookList
            books={books}
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
                            <BookSmall book={book} />
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
    )
}

export default Screen