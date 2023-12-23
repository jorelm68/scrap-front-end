import { View, Text } from 'react-native-ui-lib'
import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import { useLocalSearchParams } from 'expo-router'
import BookComponent from '../components/BookComponent'
import { dimensions, palette } from '../data/styles'
import BookList from '../components/BookList'

const Books = () => {
  const { user } = useContext(AppContext)
  const params = useLocalSearchParams()
  const books = JSON.parse(params.books)

  return (
    <BookList 
      books={books}
      renderItem={(book) => {
        return (
          <BookComponent book={book} key={book}/>
        )
      }}
    />
  )
}

export default Books