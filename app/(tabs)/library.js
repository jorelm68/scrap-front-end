import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext'
import useAuthor from '../../hooks/useAuthor'
import ScrapComponent from '../../components/ScrapComponent'

const Library = () => {
  const { user } = useContext(AppContext)
  const {
    scraps,
  } = useAuthor(user, [
    'scraps',
  ])

  return (
    <View>
      {scraps && scraps.length > 0 && scraps.map((scrap) => {
        return (
          <ScrapComponent scrap={scrap} key={scrap} />
        )
      })}
    </View>
  )
}

export default Library