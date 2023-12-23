import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { deleteData, loadFonts, retrieveData } from '../data/utility'
import { authorExists, isDeviceOffline } from '../data/api'
import { useRouter } from 'expo-router'
import { dimensions, palette } from '../data/styles'
import { ActivityIndicator } from 'react-native'
import LogoComponent from '../components/LogoComponent'
import { onlineSaveScraps } from '../data/offline'

loadFonts()

const Autothenticate = () => {
  const router = useRouter()
  const { setUser, setAuthenticated } = useContext(AppContext)

  useEffect(() => {
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
    const response1 = await onlineSaveScraps(user)
    if (response1.success) {
      console.log('successfully saved scraps')
      router.replace('/camera')
    }
  }

  return (
    <View flex center style={{
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: palette.color1,
    }}>
      <LogoComponent />
      <ActivityIndicator size='large' color={palette.color5} />
    </View>
  )
}

export default Autothenticate