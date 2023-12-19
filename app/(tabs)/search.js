import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { colors, dimensions, palette, styles } from '../../data/styles'
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
      response = await utilityBookSearch(user, query)
      if (!response.success) {
        Alert.alert('Error', response.error)
      }
      else {
        setResults(response.data.books)
      }
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={async () => {
          sendQuery()
        }}>
          <Ionicons name='checkmark' color={palette.primary2} size={32} />
        </TouchableOpacity>
      ),
    })
  }, [navigation, query, mode])

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
        backgroundColor: palette.secondary11,
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
              <Ionicons name={mode === 'authors' ? 'person' : 'library'} color={palette.primary2} size={18} />
            </TouchableOpacity>
          </View>
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
        </View>

        {mode === 'authors' && results && results.map((author) => {
          return (
            <AuthorComponent author={author} key={author} />
          )
        })}

        {mode === 'books' && results && results.map((book) => {
          return (
            <BookComponent book={book} key={book} clickable />
          )
        })}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Search