import { View, Text, Image } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext'
import useAuthor from '../../hooks/useAuthor'
import { dimensions } from '../../data/styles'
import { useNavigation } from 'expo-router'

const Profile = () => {
  const { user } = useContext(AppContext)
  const navigation = useNavigation()

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

  return (
    <ScrollView flex>
      <Image source={iCover} width={dimensions.width} height={dimensions.width / 2} style={{
        borderBottomRightRadius: 16,
      }} />

      <View flex row>
        <Image source={iHeadshot} width={dimensions.width / 4} height={dimensions.width / 4} style={{
          borderRadius: dimensions.width / 8,
          marginTop: -(dimensions.width / 8),
        }} />

        <Text style={{
          height: dimensions.width / 8,
          marginLeft: 8,
          fontSize: 28,
          fontFamily: 'jockeyOne',
        }}>{firstName} {lastName}</Text>
      </View>
    </ScrollView>
  )
}

export default Profile