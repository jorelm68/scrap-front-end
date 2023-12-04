import { View, Image } from 'react-native-ui-lib'
import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import useAuthor from '../../hooks/useAuthor'

const Profile = () => {
  const { user } = useContext(AppContext)

  const {
    iHeadshot,
    iCover,
  } = useAuthor(user, [
    'iHeadshot->1080',
    'iCover->1080',
  ])

  return (
    <View>
      <Image source={iHeadshot} />
      <Image source={iCover} />
    </View>
  )
}

export default Profile