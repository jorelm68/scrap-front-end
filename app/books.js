import { View, Text } from 'react-native-ui-lib'
import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import { useLocalSearchParams } from 'expo-router'
import BookComponent from '../components/BookComponent'
import { dimensions, palette } from '../data/styles'

const Books = () => {
  const { user } = useContext(AppContext)
  const params = useLocalSearchParams()
  const books = JSON.parse(params.books)

  return (
    <View style={{
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: palette.secondary11,
    }}>
      {books && books.map((book) => {
        return (
          <BookComponent book={book} key={book} clickable />
        )
      })}
    </View>
  )
}

export default Books