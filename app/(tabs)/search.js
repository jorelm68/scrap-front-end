import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useState } from 'react'
import { colors, dimensions } from '../../data/styles'
import AppContext from '../../context/AppContext'
import FieldComponent from '../../components/FieldComponent'
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

const Search = () => {
  const { user } = useContext(AppContext)
  const [query, setQuery] = useState('')

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View centerH style={{
        marginTop: 16,
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

        <TouchableOpacity>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Search