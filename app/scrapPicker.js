import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import ScrapComponent from '../components/ScrapComponent'
import { Ionicons } from '@expo/vector-icons'
import { Alert, ScrollView } from 'react-native'
import { dimensions, palette, fonts } from '../data/styles'
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
          <Ionicons name='checkmark' color={palette.primary4} size={24} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => {
          router.back()
        }}>
          <Ionicons name='close' color={palette.complement2} size={24} />
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
    <ScrollView keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} style={{
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: palette.primary1,
    }}>
      <View style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
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
                  color: palette.complement4,
                  fontFamily: fonts.playBold,
                  bottom: 4,
                  right: 4,
                }}>{selection.indexOf(scrap) + 1}</Text>
              )}
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default ScrapPicker