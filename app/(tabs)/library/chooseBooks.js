import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { dimensions, fonts } from '../../../data/styles'
import AppContext from '../../../context/AppContext'
import BookSmall from '../../../components/BookSmall'
import BookList from '../../../components/BookList'

const ChooseBooks = () => {
    const params = useLocalSearchParams()
    const router = useRouter()
    const books = JSON.parse(params.books)
    const amount = JSON.parse(params.amount)
    const functionName = params.functionName
    const { functions, palette } = useContext(AppContext)
    const onSubmit = functions[functionName]
    const [selection, setSelection] = useState([])

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={async () => {
                    onSubmit(selection)
                    router.back()
                }}>
                    <Ionicons name='checkmark-circle' color={palette.color6} size={24} />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    router.back()
                }}>
                    <Ionicons name='close-circle' color={palette.color6} size={24} />
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

export default ChooseBooks