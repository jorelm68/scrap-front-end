import { View, Text } from 'react-native-ui-lib'
import { TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Alert } from 'react-native'
import { colors, dimensions, styles } from '../data/styles'
import AppContext from '../context/AppContext'
import BookComponent from '../components/BookComponent'

const BookPicker = () => {
  const params = useLocalSearchParams()
  const router = useRouter()
  const books = JSON.parse(params.books)
  const amount = JSON.parse(params.amount)
  const functionName = params.functionName
  const { functions } = useContext(AppContext)
  const onSubmit = functions[functionName]
  const [selection, setSelection] = useState([])
  console.log(selection)

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={async () => {
          onSubmit(selection)
          router.back()
        }}>
          <Ionicons name='checkmark' color={colors.success} size={32} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => {
          router.back()
        }}>
          <Ionicons name='close' color={colors.error} size={32} />
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
    <View style={{
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: colors.background,
    }}>
      {books && books.length > 0 && books.map((book) => {
        return (
          <TouchableOpacity key={book} onPress={() => {
            console.log(book)
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
                  color: colors.interaction,
                  fontFamily: styles.text3,
                  bottom: 4,
                  right: 4,
                }}>{selection.indexOf(book) + 1}</Text>
              )}
            </View>

          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default BookPicker