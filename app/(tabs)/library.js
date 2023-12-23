import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext'
import useAuthor from '../../hooks/useAuthor'
import ScrapComponent from '../../components/ScrapComponent'
import { Ionicons } from '@expo/vector-icons'
import { dimensions, fonts, palette } from '../../data/styles'
import { useRouter } from 'expo-router'
import { bookDeleteBooks, scrapDeleteScraps } from '../../data/api'
import cache from '../../data/cache'
import { Alert } from 'react-native'

const Library = () => {
  const { user, setFunctions } = useContext(AppContext)
  const router = useRouter()
  const {
    scraps,
    setScraps,
    books,
    setBooks,
  } = useAuthor(user, [
    'scraps',
    'books',
  ])

  useEffect(() => {
    setFunctions((prevFunctions) => ({
      ...prevFunctions,
      deleteScraps: async (selection) => {
        const response = await scrapDeleteScraps(selection)
        if (response.success) {
          cache.filter([user, 'miles'])
          cache.filter([user, 'books'])
          cache.filter([user, 'profileBooks'])
          cache.filter([user, 'publicBooks'])
          cache.filter([user, 'unbookedScraps'])
          cache.filter(['scraps'])
          setScraps((prevScraps) => [
            ...prevScraps.filter((scrap) => {
              return !selection.includes(scrap)
            })
          ])

          for (const scrap of selection) {
            cache.filter([scrap])
          }
        }
      },
      deleteBooks: async (selection) => {
        const response = await bookDeleteBooks(selection)
        if (response.success) {
          cache.filter([user, 'profileBooks'])
          cache.filter([user, 'publicBooks'])
          cache.filter(['books'])
          setBooks((prevBooks) => [
            ...prevBooks.filter((book) => {
              return !selection.includes(book)
            })
          ])
          
          for (const book of books) {
            cache.filter([book])
          }
        }
      }
    }))
  }, [])

  const handleScraps = async () => {
    router.push({
      pathname: '/scraps', params: {
        scraps: JSON.stringify(scraps),
      }
    })
  }
  const handleBooks = async () => {
    router.push({
      pathname: '/books', params: {
        books: JSON.stringify(books),
      }
    })
  }
  const handleCreateBook = async () => {
    router.push('/createBook')
  }

  const handleDeleteBooks = async () => {
    router.push({
      pathname: '/bookPicker', params: {
        books: JSON.stringify(books),
        amount: JSON.stringify(books.length),
        functionName: 'deleteBooks',
      }
    })
  }

  const handleCreateScrap = async () => {
    router.replace('/camera')
  }

  const handleDeleteScraps = async () => {
    router.push({
      pathname: '/scrapPicker', params: {
        scraps: JSON.stringify(scraps),
        amount: JSON.stringify(scraps.length),
        functionName: 'deleteScraps',
      }
    })
  }

  return (
    <View style={{
      backgroundColor: palette.color1,
    }}>
      <View style={{
        height: '5%',
      }} />
      <View row center style={{
        height: '45%',
      }}>
        <TouchableOpacity center onPress={handleBooks}>
          <Ionicons name='library-outline' size={dimensions.width / 3} color={palette.color6} />
          <Text style={{
            fontFamily: fonts.playBold,
            fontSize: 48,
            color: palette.color6,
          }}>Books</Text>
        </TouchableOpacity>

        <View>
          <TouchableOpacity row center onPress={handleCreateBook}>
            <Ionicons name='add' size={24} color={palette.color6} />
            <Text style={{
              fontSize: 18,
              fontFamily: fonts.jockeyOne,
              color: palette.color6,
            }}> Create</Text>
          </TouchableOpacity>
          <View style={{
            height: '15%',
          }} />
          <TouchableOpacity row center onPress={handleDeleteBooks}>
            <Ionicons name='remove' size={24} color={palette.color6} />
            <Text style={{
              fontSize: 18,
              fontFamily: fonts.jockeyOne,
              color: palette.color6,
            }}> Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View row center style={{
        height: '45%',
      }}>
        <TouchableOpacity center onPress={handleScraps}>
          <Ionicons name='image-outline' size={dimensions.width / 3} color={palette.color6} />
          <Text style={{
            fontFamily: fonts.playBold,
            fontSize: 48,
            color: palette.color6,
          }}>Scraps</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity row center onPress={handleCreateScrap}>
            <Ionicons name='add' size={24} color={palette.color6} />
            <Text style={{
              fontSize: 18,
              fontFamily: fonts.jockeyOne,
              color: palette.color6,
            }}> Create</Text>
          </TouchableOpacity>
          <View style={{
            height: '15%',
          }} />
          <TouchableOpacity row center onPress={handleDeleteScraps}>
            <Ionicons name='remove' size={24} color={palette.color6} />
            <Text style={{
              fontSize: 18,
              fontFamily: fonts.jockeyOne,
              color: palette.color6,
            }}> Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{
        height: '5%',
      }} />
    </View>
  )
}

export default Library