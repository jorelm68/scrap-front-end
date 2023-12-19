import { View, TouchableOpacity } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScrapComponent from '../components/ScrapComponent'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import ScrapCarousel from '../components/ScrapCarousel'
import { Ionicons } from '@expo/vector-icons'
import { colors, styles, dimensions, palette } from '../data/styles'
import MapView from 'react-native-maps'
import useScrap from '../hooks/useScrap'
import AppContext from '../context/AppContext'
import MapComponent from '../components/MapComponent'

const Scraps = () => {
  const router = useRouter()
  const params = useLocalSearchParams()
  const scraps = JSON.parse(params.scraps)

  return (
    <View style={{
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: palette.secondary11,
    }}>
      {scraps && scraps.map((scrap) => {
        return (
          <TouchableOpacity key={scrap} onPress={() => {
            router.push({
              pathname: '/book',
              params: {
                scraps: JSON.stringify(scraps),
                page: JSON.stringify(scraps.indexOf(scrap))
              }
              
            })
          }}>
            <ScrapComponent scrap={scrap} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Scraps