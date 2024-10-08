import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import utility from '../data/utility'
import api from '../data/api'
import { router } from 'expo-router'
import { dark, dimensions, light, fonts } from '../data/styles'
import { ActivityIndicator } from 'react-native'
import Logo from '../components/Logo'

utility.loadFonts()

const Screen = () => {
  const { palette, setUser, setAuthenticated, setDarkMode, setPalette } = useContext(AppContext)
  const [savingScraps, setSavingScraps] = useState(false)

  const startup = async () => {
    const darkModeRaw = await utility.retrieveData('darkMode')
    const darkMode = JSON.parse(darkModeRaw)
    setDarkMode(darkMode)
    setPalette(darkMode ? dark : light)

    const autothenticate = await utility.retrieveData('autothenticate')
    const { author, token } = JSON.parse(autothenticate)
    if (!author) {
      router.replace('/authentication/signIn')
      return
    }

    const response = await api.author.autothenticate(author, token)
    if (!response.success || !response.data.autothenticate) {
      await utility.deleteData('autothenticate')
      router.replace('/authentication/signIn')
      return
    }

    setUser(author)
    setAuthenticated(true)
    const yes = await utility.hasOfflineScraps()
    if (yes) {
      setSavingScraps(true)
      const response1 = await utility.onlineSaveScraps(author)
      if (response1.success) {
        console.log('Successfully saved offline scraps!')
      }
      setSavingScraps(false)
    }
    router.replace('/camera')
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

export default Screen