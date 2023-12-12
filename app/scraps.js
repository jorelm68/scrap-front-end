import { View, Text } from 'react-native-ui-lib'
import React from 'react'
import ScrapComponent from '../components/ScrapComponent'
import { useLocalSearchParams } from 'expo-router'

const Scraps = () => {
  const params = useLocalSearchParams()
  const scraps = JSON.parse(params.scraps)

  return (
    <View style={{
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
    }}>
      {scraps && scraps.map((scrap) => {
        return (
          <ScrapComponent scrap={scrap} key={scrap} />
        )
      })}
    </View>
  )
}

export default Scraps