import { View, Text } from 'react-native-ui-lib'
import React from 'react'
import { colors, dimensions } from '../data/styles'

const BookPicker = () => {
  return (
    <View style={{
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: colors.background,
    }}>
      <Text>BookPicker</Text>
    </View>
  )
}

export default BookPicker