import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import utility from '../data/utility'
import api from '../data/api'
import { router } from 'expo-router'
import { dark, dimensions, light, palette } from '../data/styles'
import { ActivityIndicator } from 'react-native'
import Logo from '../components/Logo'

utility.loadFonts()

const Autothenticate = () => {
  const { setUser, setAuthenticated, setDarkMode, setPalette } = useContext(AppContext)
  const [savingScraps, setSavingScraps] = useState(false)

  const startup = async () => {
    const darkModeRaw = await utility.retrieveData('darkMode')
    const darkMode = JSON.parse(darkModeRaw)
    setDarkMode(darkMode)
    setPalette(darkMode ? dark : light)

    const offline = await utility.isDeviceOffline()
    if (offline) {
      router.replace('offlineCamera')
    }
    else {
      const user = await utility.retrieveData('autothenticate')
      if (!user) {
        router.replace('/signIn')
        return
      }
      const response = await api.author.exists(user)
      if (!response.success) {
        await utility.deleteData('autothenticate')
        router.replace('/signIn')
        return
      }

      setUser(user)
      setAuthenticated(true)
      const yes = await utility.hasOfflineScraps()
      if (yes) {
        const response1 = await utility.onlineSaveScraps(response.data.author)
        if (response1.success) {
          console.log('Successfully saved offline scraps!')
        }
      }
      router.replace('/camera')
    }
  }

  useEffect(() => {
    startup()
  }, [])

  return (
    <View flex center style={{
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: palette.color1,
    }}>
      <Logo />
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