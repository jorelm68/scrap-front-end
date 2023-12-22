import { View, Text, TouchableOpacity, Switch } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import DropDownComponent from '../components/DropDownComponent'
import { regexBookDescription, regexBookTitle } from '../data/regex'
import { errorBookDescription, errorBookTitle } from '../data/error'
import { useNavigation, useRouter } from 'expo-router'
import { bookSaveBook } from '../data/api'
import { Ionicons } from '@expo/vector-icons'
import { dimensions, palette } from '../data/styles'
import ButtonComponent from '../components/ButtonComponent'
import useAuthor from '../hooks/useAuthor'
import ScrapComponent from '../components/ScrapComponent'
import SwitchComponent from '../components/SwitchComponent'
import cache from '../data/cache'

const CreateBook = () => {
  const navigation = useNavigation()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { user, setFunctions } = useContext(AppContext)
  const [book, setBook] = useState({
    author: user,
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
          setIsLoading(true)
          const response = await bookSaveBook(book)
          if (!response.success) {
            Alert.alert('Error', response.error)
          }
          else {
            cache.filter([user, 'books'])
            cache.filter([user, 'publicBooks'])
            router.back()
          }
          setIsLoading(false)
        }}>
          <Ionicons name='checkmark-circle' color={palette.complement4} size={24} />
        </TouchableOpacity>
      ),
      headerLeft: () => ( // Corrected headerLeft configuration
        <TouchableOpacity onPress={() => {
          router.back()
        }}>
          <Ionicons name='close-circle' color={palette.complement4} size={24} />
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

  if (isLoading) {
    return (
      <Text>Loading</Text>
    )
  }

  return (
    <View style={{
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: palette.primary0,
    }}>
      <View center style={{
        marginVertical: 16,
      }}>
        <SwitchComponent title={'Public? '} value={book.isPublic} onSwitch={() => {
          setBook((prevBook) => ({
            ...prevBook,
            isPublic: !prevBook.isPublic,
          }))
        }} />
      </View>


      <DropDownComponent
        type='Text'
        title='Title:'
        value={book.title}
        boxes={[
          {
            placeholder: 'New Title',
            regex: regexBookTitle,
            error: errorBookTitle,
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
      <DropDownComponent
        type='Text'
        title='Description:'
        value={book.description}
        boxes={[
          {
            placeholder: 'New Description',
            regex: regexBookDescription,
            error: errorBookDescription,
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
      <DropDownComponent
        type='Scrap'
        title='Representative:'
        value={book.representative}
        options={book.scraps}
        amount={1}
        onSubmit={() => {
          router.push({
            pathname: '/scrapPicker', params: {
              scraps: JSON.stringify(book.scraps ? book.scraps : []),
              amount: JSON.stringify(1),
              functionName: 'setRepresentative',
            }
          })
        }}
      />

      {unbookedScraps.length < 10 && (
        <View center style={{
          marginVertical: 16,
        }}>
          <ButtonComponent
            label='Add Scraps'
            size='large'
            onPress={() => {
              router.push({
                pathname: '/scrapPicker', params: {
                  scraps: JSON.stringify(unbookedScraps.filter((value) => {
                    return !book.scraps || !book.scraps.includes(value)
                  })),
                  amount: JSON.stringify(10 - unbookedScraps.length),
                  functionName: 'addScrapsToBook',
                }
              })
            }}
            width='50%'
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
              <ScrapComponent scrap={scrap} />
            </TouchableOpacity>
          )
        })}
      </View>

    </View>
  )
}

export default CreateBook