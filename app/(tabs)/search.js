import { View, Text } from 'react-native'
import React from 'react'
import { colors, dimensions } from '../../data/styles'

const Search = () => {
  return (
    <View style={{
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: colors.background,
    }}>
      <Text>search</Text>
    </View>
  )
}

export default Search