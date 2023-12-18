import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { colors, dimensions } from '../../data/styles'
import AppContext from '../../context/AppContext'
import FieldComponent from '../../components/FieldComponent'
import { Alert, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { utilityAuthorSearch } from '../../data/api'
import AuthorComponent from '../../components/AuthorComponent'
import { useNavigation } from 'expo-router/build'
import { Ionicons } from '@expo/vector-icons'

const Search = () => {
  const { user } = useContext(AppContext)
  const [query, setQuery] = useState('')
  const navigation = useNavigation()
  const [results, setResults] = useState('')

  const sendQuery = async () => {
    const response = await utilityAuthorSearch(user, query)
    if (!response.success) {
      Alert.alert('Error', response.error)
    }
    else {
      setResults(response.data.authors)
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={async () => {
          sendQuery()
        }}>
          <Ionicons name='checkmark' color={colors.success} size={32} />
        </TouchableOpacity>
      ),
    })
  }, [navigation, query])

  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View centerH style={{
        marginVertical: 16,
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: colors.background,
      }}>
        <FieldComponent
          placeholder='Search...'
          width='80%'
          value={query}
          onChangeText={(value) => {
            setQuery(value)
          }}
          autoCorrect={false}
          autoCapitalize='none'
          autoComplete='off'
        />

        {results && results.map((author) => {
          return (
            <AuthorComponent author={author} key={author} />
          )
        })}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Search