import { View, Text } from 'react-native-ui-lib'
import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import { useLocalSearchParams } from 'expo-router'
import BookSmall from '../components/BookSmall'
import { dimensions } from '../data/styles'
import BookList from '../components/BookList'

const Screen = ({ books }) => {
  return (
    <BookList
      books={books.reverse()}
      renderItem={(book) => {
        return (
          <BookSmall book={book} key={book} clickable />
        )
      }}
    />
  )
}

export default Screen