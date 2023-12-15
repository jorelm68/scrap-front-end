import { View, Text } from 'react-native-ui-lib'
import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import { useLocalSearchParams } from 'expo-router'
import BookComponent from '../components/BookComponent'

const Books = () => {
  const { user } = useContext(AppContext)
  const params = useLocalSearchParams()
  const books = JSON.parse(params.books)

  return (
    <View>
      {books && books.map((book) => {
        return (
          <BookComponent book={book} key={book} />
        )
      })}
    </View>
  )
}

export default Books