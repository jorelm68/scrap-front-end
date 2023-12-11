import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext'
import useAuthor from '../../hooks/useAuthor'
import ScrapComponent from '../../components/ScrapComponent'
import { Ionicons } from '@expo/vector-icons'
import { dimensions, colors, styles } from '../../data/styles'

const Library = () => {
  const { user } = useContext(AppContext)
  const {
    scraps,
  } = useAuthor(user, [
    'scraps',
  ])

  return (
    <View>
      <View style={{
        height: '5%',
      }} />
      <View row center style={{
        height: '45%',
      }}>
        <View center>
          <Ionicons name='library-outline' size={dimensions.width / 3} color={colors.default} />
          <Text style={{
            fontFamily: styles.text3,
            fontSize: 48,
          }}>Books</Text>
        </View>

        <View>
          <View row center>
            <Ionicons name='add' size={24} color={colors.default} />
            <Text style={{
              fontSize: 18,
              fontFamily: styles.text2,
            }}> Create</Text>
          </View>
          <View style={{
            height: '15%',
          }} />
          <View row center>
            <Ionicons name='remove' size={24} color={colors.default} />
            <Text style={{
              fontSize: 18,
              fontFamily: styles.text2,
            }}> Delete</Text>
          </View>
        </View>
      </View>

      <View row center style={{
        height: '45%',
      }}>
        <View center>
          <Ionicons name='image-outline' size={dimensions.width / 3} color={colors.default} />
          <Text style={{
            fontFamily: styles.text3,
            fontSize: 48,
          }}>Scraps</Text>
        </View>
        <View>
          <View row center>
            <Ionicons name='add' size={24} color={colors.default} />
            <Text style={{
              fontSize: 18,
              fontFamily: styles.text2,
            }}> Create</Text>
          </View>
          <View style={{
            height: '15%',
          }} />
          <View row center>
            <Ionicons name='remove' size={24} color={colors.default} />
            <Text style={{
              fontSize: 18,
              fontFamily: styles.text2,
            }}> Delete</Text>
          </View>
        </View>
      </View>
      <View style={{
        height: '5%',
      }} />
    </View>
  )
}

export default Library