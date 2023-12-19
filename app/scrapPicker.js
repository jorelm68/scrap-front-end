import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import ScrapComponent from '../components/ScrapComponent'
import { Ionicons } from '@expo/vector-icons'
import { Alert } from 'react-native'
import { colors, dimensions, palette, styles } from '../data/styles'
import AppContext from '../context/AppContext'

const ScrapPicker = () => {
  const params = useLocalSearchParams()
  const router = useRouter()
  const scraps = JSON.parse(params.scraps)
  const amount = JSON.parse(params.amount)
  const functionName = params.functionName
  const { functions } = useContext(AppContext)
  const onSubmit = functions[functionName]
  const [selection, setSelection] = useState([])

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={async () => {
          onSubmit(selection)
          router.back()
        }}>
          <Ionicons name='checkmark' color={palette.primary2} size={32} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => {
          router.back()
        }}>
          <Ionicons name='close' color={palette.complement2} size={32} />
        </TouchableOpacity>
      ),
    })
  }, [navigation, selection])

  const toggleSelect = async (scrap) => {
    if (selection.includes(scrap)) {
      setSelection((prevSelection) => [
        ...prevSelection.filter((value) => {
          return value !== scrap
        })
      ])
    }
    else {
      if (selection.length === amount) {
        setSelection((prevSelection) => [
          ...prevSelection.slice(1),
          scrap,
        ])
      }
      else {
        setSelection((prevSelection) => [
          ...prevSelection,
          scrap,
        ])
      }
    }
  }

  return (
    <View style={{
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: palette.secondary11,
    }}>
      {scraps && scraps.length > 0 && scraps.map((scrap) => {
        return (
          <TouchableOpacity key={scrap} onPress={() => {
            toggleSelect(scrap)
          }}>
            <View style={selection.includes(scrap) ? {
              opacity: 0.5,
            } : {
              opacity: 1,
            }}>
              <ScrapComponent scrap={scrap} />
            </View>
            {selection.includes(scrap) && (
              <Text style={{
                position: 'absolute',
                fontSize: 45,
                color: palette.secondary00,
                fontFamily: styles.text3,
                bottom: 4,
                right: 4,
              }}>{selection.indexOf(scrap) + 1}</Text>
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default ScrapPicker