import { View, TouchableOpacity } from 'react-native-ui-lib'
import React, { useState } from 'react'
import ScrapComponent from '../components/ScrapComponent'
import { useLocalSearchParams } from 'expo-router'
import ScrapCarousel from '../components/ScrapCarousel'

const Scraps = () => {
  const params = useLocalSearchParams()
  const scraps = JSON.parse(params.scraps)
  const [carousel, setCarousel] = useState(false)
  const [initialPage, setInitialPage] = useState(0)

  return (
    <View style={{
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
    }}>
      {!carousel && scraps && scraps.map((scrap) => {
        return (
          <TouchableOpacity key={scrap} onPress={() => {
            setInitialPage(scraps.indexOf(scrap))
            setCarousel(true)
          }}>
            <ScrapComponent scrap={scrap} />
          </TouchableOpacity>
        )
      })}
      {carousel && scraps && (
        <ScrapCarousel scraps={scraps} initialPage={initialPage} />
      )}
    </View>
  )
}

export default Scraps