import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { dimensions, fonts } from '../data/styles'
import AppContext from '../context/AppContext'
import Field from '../components/Field'
import { Alert, Keyboard, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import api from '../data/api'
import AuthorSmall from '../components/AuthorSmall'
import { useNavigation, router, usePathname } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import BookSmall from '../components/BookSmall'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import MapView, { Polyline } from 'react-native-maps'
import BookList from '../components/BookList'
import BookMarker from '../components/BookMarker'
import utility from '../data/utility'

const Screen = () => {
  const { user, palette } = useContext(AppContext)
  const tab = utility.getTab(usePathname())
  const [query, setQuery] = useState('')
  const [results, setResults] = useState('')
  const [mode, setMode] = useState('authors')
  const [coordinates, setCoordinates] = useState([])

  const {
    representative,
  } = useBook(results[0], [
    'representative',
  ])

  const {
    latitude,
    longitude,
  } = useScrap(representative, [
    'latitude',
    'longitude',
  ])

  const [region, setRegion] = useState({
    latitude,
    longitude,
  })

  useEffect(() => {
    setRegion({
      latitude,
      longitude,
    })
  }, [latitude, longitude])

  const getCoordinates = async () => {
    const response = await api.utility.bookCoordinates(results)
    if (!response.success) {
      Alert.alert('Error', response.error)
    }
    else {
      setCoordinates(response.data.coordinates)
    }
  }
  useEffect(() => {
    getCoordinates()
  }, [results])

  const sendQuery = async () => {
    Keyboard.dismiss()
    let response = []
    if (mode === 'authors') {
      response = await api.utility.authorSearch(user, query)
      if (!response.success) {
        Alert.alert('Error', response.error)
      }
      else {
        setResults(response.data.authors)
      }
    }
    else {
      response = await api.utility.bookSearch(user, query, ['restrictedBooks'])
      if (!response.success) {
        Alert.alert('Error', response.error)
      }
      else {
        setResults(response.data.books)
      }
    }
  }

  return (
    <View style={{
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: palette.color1,
    }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View centerH style={{
          width: dimensions.width,
          height: dimensions.height,
          backgroundColor: palette.color1,
        }}>
          <View center row style={{
            width: dimensions.width * (8 / 10),
            marginVertical: 16,
          }}>
            <View center style={{
              width: dimensions.width * (1 / 10),
              height: 48,
            }}>
              <TouchableOpacity onPress={() => {
                setResults([])
                if (mode === 'authors') {
                  setMode('books')
                }
                else {
                  setMode('authors')
                }
              }}>
                <Ionicons name={mode === 'authors' ? 'person' : 'library'} color={palette.accent} size={18} />
              </TouchableOpacity>
            </View>
            <Field
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
                <Ionicons name='search' color={palette.color6} size={24} />
              </View>
            </TouchableOpacity>
          </View>

          {mode === 'authors' && results && results.map((author) => {
            return (
              <AuthorSmall author={author} key={author} />
            )
          })}

          {mode === 'books' && results && results.length > 0 && (
            <MapView
              region={region}
              style={{
                width: dimensions.width,
                marginBottom: 4,
                borderRadius: 8,
                height: 200,
              }}
            >
              {results && results.map((book) => {
                return (
                  <TouchableOpacity key={book} onPress={() => {
                    router.navigate(`/${tab}/book/${book}`)
                  }}>
                    <BookMarker book={book} />
                  </TouchableOpacity>
                )
              })}

              <Polyline
                coordinates={coordinates}
                strokeColor={palette.accent}
                strokeWidth={2}
              />
            </MapView>
          )}
          <BookList
            books={results}
            renderItem={(book) => {
              return (
                <BookSmall book={book} clickable />
              )
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Screen