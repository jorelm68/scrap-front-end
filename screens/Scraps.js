import { View, TouchableOpacity } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScrapSmall from '../components/ScrapSmall'
import { useLocalSearchParams, useNavigation, usePathname, useRouter } from 'expo-router'
import ScrapCarousel from '../components/ScrapCarousel'
import { Ionicons } from '@expo/vector-icons'
import { styles, dimensions } from '../data/styles'
import MapView from 'react-native-maps'
import useScrap from '../hooks/useScrap'
import AppContext from '../context/AppContext'
import ScrapList from '../components/ScrapList'
import utility from '../data/utility'

const Scraps = ({ scraps }) => {
  const { palette } = useContext(AppContext)
  const tab = utility.getTab(usePathname())
  const router = useRouter()

  return (
    <ScrapList
      scraps={scraps}
      renderItem={(scrap) => {
        return (
          <TouchableOpacity key={scrap} onPress={() => {
            router.push({
              pathname: `/${tab}/book/`,
              params: {
                scraps: JSON.stringify(scraps),
                page: JSON.stringify(scraps.indexOf(scrap))
              }

            })
          }}>
            <ScrapSmall scrap={scrap} />
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default Scraps