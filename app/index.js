import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { deleteData, loadFonts, retrieveData } from '../data/utility'
import { authorExists, isDeviceOffline } from '../data/api'
import { useRouter } from 'expo-router'
import { dark, dimensions, light, palette } from '../data/styles'
import { ActivityIndicator } from 'react-native'
import LogoComponent from '../components/LogoComponent'
import { hasOfflineScraps, onlineSaveScraps } from '../data/offline'

loadFonts()

const Autothenticate = () => {
  const router = useRouter()
  const { setUser, setAuthenticated, setDarkMode, setPalette } = useContext(AppContext)
  const [savingScraps, setSavingScraps] = useState(false)

  useEffect(() => {
    retrieveData('darkMode').then((darkModeRaw) => {
      const darkMode = JSON.parse(darkModeRaw)
      setDarkMode(darkMode)
      setPalette(darkMode ? dark : light)
    })
    loadFonts().then(() => {
      isDeviceOffline().then(offline => {
        if (offline) {
          router.replace('/offlineCamera')
        }
        if (!offline) {
          autothenticate()
        }
      }).catch((error) => {
        console.log(error.message)
      })
    }).catch((error) => {
      console.log(error.message)
    })
  }, [])

  const autothenticate = async () => {
    const user = await retrieveData('autothenticate')
    if (!user) {
      router.replace('/signIn')
      return
    }
    const response = await authorExists(user)
    if (!response.success) {
      await deleteData('autothenticate')
      router.replace('/signIn')
      return
    }

    setUser(user)
    setAuthenticated(true)
    const yes = await hasOfflineScraps()
    if (yes) {
      const response1 = await onlineSaveScraps(response.data.author)
      if (response1.success) {
        console.log('Successfully saved offline scraps!')
      }
    }
    router.replace('/camera')
  }

  return (
    <View flex center style={{
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: palette.color1,
    }}>
      <LogoComponent />
      <ActivityIndicator size='large' color={palette.color5} />
      {savingScraps && (
        <Text style={{
          fontFamily: fonts.itim,
          fontSize: 16,
          color: palette.color6,
        }}>Saving the scraps you took while offline...</Text>
      )}
    </View>
  )
}

export default Autothenticate