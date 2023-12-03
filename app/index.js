import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { deleteData, loadFonts, retrieveData } from '../data/utility'
import { authorExists, isDeviceOffline } from '../data/api'
import { useRouter } from 'expo-router'

const Autothenticate = () => {
  const router = useRouter()
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const { loading, setLoading, offline, setOffline, authenticated, setUser, setAuthenticated } = useContext(AppContext)

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true)
    }).catch(() => { })
    isDeviceOffline().then(offline => {
      setOffline(offline)
      if (!offline) {
        autothenticate()
      }
    }).catch(() => { })
  }, [])

  const autothenticate = async () => {
    const user = await retrieveData('autothenticate')
    console.log(user)
    if (!user) {
      router.replace('/authenticate')
      return
    }
    const response = await authorExists(user)
    if (!response.success) {
      await deleteData('autothenticate')
      router.push('/authenticate')
      return
    }

    setUser(user)
    setAuthenticated(true)
    router.push('/one')
  }

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default Autothenticate