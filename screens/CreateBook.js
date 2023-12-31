import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import AppContext from '../context/AppContext'
import DropDown from '../components/DropDown'
import regex from '../data/regex'
import error from '../data/error'
import { useNavigation, usePathname, router } from 'expo-router'
import api from '../data/api'
import { Ionicons } from '@expo/vector-icons'
import { dark, dimensions } from '../data/styles'
import Button from '../components/Button'
import useAuthor from '../hooks/useAuthor'
import ScrapSmall from '../components/ScrapSmall'
import Switch from '../components/Switch'
import cache from '../data/cache'
import utility from '../data/utility'

const Screen = () => {
  const navigation = useNavigation()
  const { user, setFunctions, palette, paused, setPaused } = useContext(AppContext)
  const tab = utility.getTab(usePathname())
  const [book, setBook] = useState({
    author: user,
    scraps: [],
  })

  const {
    unbookedScraps
  } = useAuthor(user, [
    'unbookedScraps',
  ])

  const handleRemoveScrap = (scrap) => {
    setBook((prevBook) => ({
      ...prevBook,
      scraps: prevBook.scraps.filter((value) => {
        return scrap !== value
      }),
      representative: scrap === prevBook.representative ? undefined : prevBook.representative,
    }))
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={async () => {
          if (paused) return { success: false, error: 'Please don\'t click too fast' }
          setPaused(true)
          router.navigate('/loading')
          const response = await api.book.saveBook(book)
          if (!response.success) {
            router.back()
            Alert.alert('Error', response.error)
          }
          else {
            cache.filter([user, 'books'])
            cache.filter([user, 'publicBooks'])
            cache.filter([user, 'profileBooks'])
            cache.filter([user, 'unbookedScraps'])
            router.back()
          }
          router.back()
          setPaused(false)
        }}>
          <Ionicons name='checkmark' color={dark.color6} size={24} />
        </TouchableOpacity>
      ),
      headerLeft: () => ( // Corrected headerLeft configuration
        <TouchableOpacity onPress={() => {
          router.back()
        }}>
          <Ionicons name='close' color={dark.color6} size={24} />
        </TouchableOpacity>
      ), // Don't forget the closing parenthesis for headerLeft
    })
  }, [navigation, book])

  useEffect(() => {
    setFunctions((prevFunctions) => ({
      ...prevFunctions,
      addScrapsToBook: async (selection) => {
        setBook((prevBook) => ({
          ...prevBook,
          scraps: [...(prevBook.scraps ? prevBook.scraps : []), ...selection],
          representative: prevBook.representative ? prevBook.representative : selection[0],
        }))
      },
      setRepresentative: async (selection) => {
        setBook((prevBook) => ({
          ...prevBook,
          representative: selection[0],
        }))
      },
    }))
  }, [])

  return (
    <KeyboardAvoidingView behavior="padding" style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: palette.color1,
      }}>
        <View center style={{
          marginVertical: 16,
        }}>
          <Switch title={'Public? '} value={book.isPublic} onSwitch={() => {
            setBook((prevBook) => ({
              ...prevBook,
              isPublic: !prevBook.isPublic,
            }))
          }} />
        </View>


        <DropDown
          type='Text'
          title='Title:'
          value={book.title}
          boxes={[
            {
              placeholder: 'New Title',
              regex: regex.book.title,
              error: error.book.title,
              autoCorrect: false,
              autoCapitalize: 'words',
            }
          ]}
          onSubmit={async (values) => {
            setBook((prevBook) => ({
              ...prevBook,
              title: values[0],
            }))
            return {
              success: true,
            }
          }}
          topBorder
        />
        <DropDown
          type='Text'
          title='Description:'
          value={book.description}
          boxes={[
            {
              placeholder: 'New Description',
              regex: regex.book.description,
              error: error.book.description,
              autoCorrect: true,
              autoCapitalize: 'sentences',
            }
          ]}
          onSubmit={async (values) => {
            setBook((prevBook) => ({
              ...prevBook,
              description: values[0],
            }))
            return {
              success: true,
            }
          }}
        />
        <DropDown
          type='Scrap'
          title='Front Cover:'
          value={book.representative}
          options={book.scraps}
          amount={1}
          onSubmit={() => {
            router.navigate({
              pathname: `/${tab}/book/chooseScraps`,
              params: {
                scraps: JSON.stringify(book.scraps ? book.scraps : []),
                amount: JSON.stringify(1),
                functionName: 'setRepresentative',
              }
            })
          }}
        />

        {book.scraps && book.scraps.length < 10 && (
          <View center style={{
            marginVertical: 16,
          }}>
            <Button
              label='Add Scraps'
              icon='image'
              onPress={() => {
                router.navigate({
                  pathname: `/${tab}/book/chooseScraps`,
                  params: {
                    scraps: JSON.stringify(unbookedScraps.filter((value) => {
                      return !book.scraps || !book.scraps.includes(value)
                    })),
                    amount: JSON.stringify(book.scraps ? 10 - book.scraps.length : 10),
                    functionName: 'addScrapsToBook',
                  }
                })
              }}
            />
          </View>
        )}

        <View style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}>
          {book.scraps && book.scraps.map((scrap) => {
            return (
              <TouchableOpacity key={scrap} onPress={() => {
                handleRemoveScrap(scrap)
              }}>
                <ScrapSmall scrap={scrap} />
              </TouchableOpacity>
            )
          })}
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Screen