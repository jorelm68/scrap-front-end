import { View, Text, Image } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import useAuthor from '../../hooks/useAuthor'
import { dimensions } from '../../data/styles'
import { useNavigation } from 'expo-router'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'

const Profile = () => {
  const { user } = useContext(AppContext)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [photosReverse, setPhotosReverse] = useState(false)

  const {
    iHeadshot,
    iCover,
    firstName,
    lastName,
    pseudonym,
  } = useAuthor(user, [
    'iHeadshot->1080',
    'iCover->1080',
    'firstName',
    'lastName',
    'pseudonym',
  ])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${firstName} ${lastName}`,
    });
  }, [navigation, firstName, lastName])

  useEffect(() => {
    setName(`${firstName} ${lastName}`)
  }, [firstName, lastName])

  const handleToggleName = () => {
    if (name === pseudonym) {
      setName(`${firstName} ${lastName}`)
    }
    else {
      setName(pseudonym)
    }
  }

  const handleTogglePhotos = () => {
    setPhotosReverse(!photosReverse)
  }

  return (
    <ScrollView flex>
      <TouchableWithoutFeedback onPress={handleTogglePhotos}>
        <Image source={photosReverse ? iHeadshot : iCover} width={dimensions.width} height={dimensions.width / 2} style={{
          borderBottomRightRadius: 16,
        }} />
      </TouchableWithoutFeedback>

      <View flex row>
        <TouchableWithoutFeedback onPress={handleTogglePhotos}>
          <Image source={photosReverse ? iCover : iHeadshot} width={dimensions.width / 4} height={dimensions.width / 4} style={{
            borderRadius: dimensions.width / 8,
            marginTop: -(dimensions.width / 8),
          }} />
        </TouchableWithoutFeedback>

        <TouchableOpacity onPress={handleToggleName}>
          <Text style={{
            height: dimensions.width / 8,
            marginLeft: 8,
            fontSize: 28,
            fontFamily: 'jockeyOne',
          }}>{name}</Text>
        </TouchableOpacity>



      </View>
    </ScrollView>
  )
}

export default Profile