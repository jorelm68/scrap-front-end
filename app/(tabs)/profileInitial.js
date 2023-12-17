import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import ProfileComponent from '../../components/ProfileComponent'

const ProfileInitial = () => {
  const { user } = useContext(AppContext)
  return (
    <ProfileComponent author={user} />
  )
}

export default ProfileInitial