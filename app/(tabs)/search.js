import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { dimensions, palette, fonts } from '../../data/styles'
import AppContext from '../../context/AppContext'
import FieldComponent from '../../components/FieldComponent'
import { Alert, Keyboard, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { utilityAuthorSearch, utilityBookCoordinates, utilityBookSearch } from '../../data/api'
import AuthorComponent from '../../components/AuthorComponent'
import { useNavigation, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import BookComponent from '../../components/BookComponent'
import useBook from '../../hooks/useBook'
import useScrap from '../../hooks/useScrap'
import MapView, { Polyline } from 'react-native-maps'
import BookMarker from '../../components/BookMarker'

const Search = () => {
  const { user } = useContext(AppContext)
  const [query, setQuery] = useState('')
  const navigation = useNavigation()
  const router = useRouter()
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
    const response = await utilityBookCoordinates(results)
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}  keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} style={{
      backgroundColor: palette.color1,
      width: dimensions.width,
      height: dimensions.height,
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
                <Ionicons name='search' color={palette.color6} size={24} />
              </View>
            </TouchableOpacity>
          </View>

          {mode === 'authors' && results && results.map((author) => {
            return (
              <AuthorComponent author={author} key={author} />
            )
          })}

          {mode === 'books' && results && results.length > 0 && (
            <MapView
              region={region}
              style={{
                width: dimensions.width,
                marginBottom: 4,
                borderRadius: 8,
                height: dimensions.height - ((dimensions.width / 2) + (dimensions.width / 8 * 3) + (dimensions.width / 8)) - 90 - 16,
              }}
            >
              {results && results.map((book) => {
                return (
                  <TouchableOpacity key={book} onPress={() => {
                    router.push({
                      pathname: '/book',
                      params: {
                        book,
                      }
                    })
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
          {mode === 'books' && results && results.map((book) => {
            return (
              <BookComponent book={book} key={book} clickable showAuthor />
            )
          })}
        </View>
      </TouchableWithoutFeedback>
      <View height={80 + 4} />
    </ScrollView>
  )
}

export default Search