import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { dimensions, palette, fonts } from '../../data/styles'
import AppContext from '../../context/AppContext'
import FieldComponent from '../../components/FieldComponent'
import { Alert, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { utilityAuthorSearch, utilityBookSearch } from '../../data/api'
import AuthorComponent from '../../components/AuthorComponent'
import { useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import BookComponent from '../../components/BookComponent'

const Search = () => {
  const { user } = useContext(AppContext)
  const [query, setQuery] = useState('')
  const navigation = useNavigation()
  const [results, setResults] = useState('')
  const [mode, setMode] = useState('authors')

  const sendQuery = async () => {
    Keyboard.dismiss()
    let response = []
    if (mode === 'authors') {
      response = await utilityAuthorSearch(user, query)
      if (!response.success) {
        Alert.alert('Error', response.error)
      }
      else {
        setResults(response.data.authors)
      }
    }
    else {
      response = await utilityBookSearch(user, query, ['restrictedBooks'])
      if (!response.success) {
        Alert.alert('Error', response.error)
      }
      else {
        setResults(response.data.books)
      }
    }
  }

  const toggleMode = async () => {
    setResults([])
    if (mode === 'authors') {
      setMode('books')
    }
    else {
      setMode('authors')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View centerH style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: palette.primary0,
      }}>
        <View center row style={{
          width: dimensions.width * (8 / 10),
          marginVertical: 16,
        }}>
          <View center style={{
            width: dimensions.width * (1 / 10),
            height: 48,
          }}>
            <TouchableOpacity onPress={toggleMode}>
              <Ionicons name={mode === 'authors' ? 'person' : 'library'} color={palette.complement4} size={18} />
            </TouchableOpacity>
          </View>
          <FieldComponent
            placeholder='Search...'
            width={dimensions.width * (6 / 10)}
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
              <Ionicons name='search' color={palette.complement4} size={24} />
            </View>
          </TouchableOpacity>
        </View>

        {mode === 'authors' && results && results.map((author) => {
          return (
            <AuthorComponent author={author} key={author} />
          )
        })}

        {mode === 'books' && results && results.map((book) => {
          return (
            <BookComponent book={book} key={book} clickable showAuthor />
          )
        })}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Search