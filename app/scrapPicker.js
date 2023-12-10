import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import ScrapComponent from '../components/ScrapComponent'
import { Ionicons } from '@expo/vector-icons'
import { Alert } from 'react-native'
import { colors, styles } from '../data/styles'
import AppContext from '../context/AppContext'

const ScrapPicker = () => {
  const params = useLocalSearchParams()
  const scraps = JSON.parse(params.scraps)
  const amount = JSON.parse(params.amount)
  const functionName = params.functionName
  const { functions } = useContext(AppContext)
  const onSubmit = functions[functionName]
  const [selection, setSelection] = useState([])
  const router = useRouter()

  const navigation = useNavigation()
  const savingHeader = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={async () => {
          onSubmit(selection)
          router.back()
        }}>
          <Ionicons name='checkmark' color={colors.success} size={32} />
        </TouchableOpacity>
      ),
      headerLeft: () => ( // Corrected headerLeft configuration
        <TouchableOpacity onPress={() => {
          router.back()
        }}>
          <Ionicons name='close' color={colors.error} size={32} />
        </TouchableOpacity>
      ), // Don't forget the closing parenthesis for headerLeft
    })
  }
  useEffect(() => {
    savingHeader()
  }, [navigation, selection])

  const toggleSelect = async (scrap) => {
    if (selection.includes(scrap)) {
      setSelection(selection.filter((value) => {
        return scrap !== value
      }))
    }
    else {
      if (selection.length === amount) {
        const newSelection = [...selection.slice(1), scrap]; // Remove the first element and add the new scrap
        setSelection(newSelection);
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
                color: colors.interaction,
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