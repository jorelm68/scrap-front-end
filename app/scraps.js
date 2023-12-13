import { View, Text } from 'react-native-ui-lib'
import React, { useState } from 'react'
import ScrapComponent from '../components/ScrapComponent'
import { useLocalSearchParams } from 'expo-router'
import ScrapCarousel from '../components/ScrapCarousel'

const Scraps = () => {
  const params = useLocalSearchParams()
  const scraps = JSON.parse(params.scraps)
  const [carousel, setCarousel] = useState(true)

  return (
    <View style={{
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
    }}>
      {!carousel && scraps && scraps.map((scrap) => {
        return (
          <ScrapComponent scrap={scrap} key={scrap} />
        )
      })}
      {carousel && scraps && (
        <ScrapCarousel scraps={scraps} />
      )}
    </View>
  )
}

export default Scraps