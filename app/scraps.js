import { View, TouchableOpacity } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScrapComponent from '../components/ScrapComponent'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import ScrapCarousel from '../components/ScrapCarousel'
import { Ionicons } from '@expo/vector-icons'
import { styles, dimensions } from '../data/styles'
import MapView from 'react-native-maps'
import useScrap from '../hooks/useScrap'
import AppContext from '../context/AppContext'
import MapComponent from '../components/MapComponent'
import ScrapList from '../components/ScrapList'

const Scraps = () => {
  const { palette } = useContext(AppContext)
  const router = useRouter()
  const params = useLocalSearchParams()
  const scraps = JSON.parse(params.scraps)

  return (
    <ScrapList
      scraps={scraps}
      renderItem={(scrap) => {
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
      }}
    />
  )
}

export default Scraps