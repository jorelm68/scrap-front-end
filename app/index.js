import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { deleteData, loadFonts, retrieveData } from '../data/utility'
import { authorExists, isDeviceOffline } from '../data/api'
import { useRouter } from 'expo-router'

const Autothenticate = () => {
  const router = useRouter()
  const { setOffline, setUser, setAuthenticated } = useContext(AppContext)

  useEffect(() => {
    loadFonts().then(() => {
      isDeviceOffline().then(offline => {
        setOffline(offline)
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
    router.push('/one')
  }

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default Autothenticate