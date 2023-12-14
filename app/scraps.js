import { View, TouchableOpacity } from 'react-native-ui-lib'
import React, { useEffect, useState } from 'react'
import ScrapComponent from '../components/ScrapComponent'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import ScrapCarousel from '../components/ScrapCarousel'
import { Ionicons } from '@expo/vector-icons'
import { colors, styles, dimensions } from '../data/styles'

const Scraps = () => {
  const navigation = useNavigation()
  const params = useLocalSearchParams()
  const scraps = JSON.parse(params.scraps)
  const [carousel, setCarousel] = useState(false)
  const [initialPage, setInitialPage] = useState(0)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: carousel ? () => ( // Corrected headerLeft configuration
        <TouchableOpacity onPress={() => {
          setCarousel(false)
        }}>
          <Ionicons name='chevron-back' color={colors.interaction} size={32} />
        </TouchableOpacity>
      ) : () => { }, // Don't forget the closing parenthesis for headerLeft
    })
  }, [navigation, carousel])

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