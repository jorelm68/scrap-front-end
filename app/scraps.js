import { View, TouchableOpacity } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScrapComponent from '../components/ScrapComponent'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import ScrapCarousel from '../components/ScrapCarousel'
import { Ionicons } from '@expo/vector-icons'
import { colors, styles, dimensions } from '../data/styles'
import MapView from 'react-native-maps'
import useScrap from '../hooks/useScrap'
import AppContext from '../context/AppContext'
import MapComponent from '../components/MapComponent'

const Scraps = () => {
  const { currentScrap } = useContext(AppContext)
  const router = useRouter()
  const navigation = useNavigation()
  const params = useLocalSearchParams()
  const scraps = JSON.parse(params.scraps)
  const [carousel, setCarousel] = useState(false)
  const [initialPage, setInitialPage] = useState(0)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: carousel ? () => (
        <TouchableOpacity onPress={() => {
          setCarousel(false)
        }}>
          <Ionicons name='chevron-back' color={colors.interaction} size={32} />
        </TouchableOpacity>
      ) : () => { },
    })
  }, [navigation, carousel])

  const clickMarker = async (marker) => {
    console.log(marker)
  }

  return (
    <View style={{
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
    }}>
      {!carousel && scraps && scraps.map((scrap) => {
        return (
          <TouchableOpacity key={scrap} onPress={() => {
            router.push({
              pathname: '/book',
              params: {
                scraps: JSON.stringify(scraps)
              }
              
            })
            setInitialPage(scraps.indexOf(scrap))
            setCarousel(true)
          }}>
            <ScrapComponent scrap={scrap} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Scraps