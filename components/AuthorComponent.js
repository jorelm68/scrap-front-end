import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import { Image } from 'react-native'
import React, { useContext, useState } from 'react'
import useAuthor from '../hooks/useAuthor'
import { dimensions, fonts, palette } from '../data/styles'
import { Ionicons } from '@expo/vector-icons'
import { authorAcceptRequest, authorRejectRequest, authorRemoveFriend, authorRemoveRequest, authorSendRequest } from '../data/api'
import AppContext from '../context/AppContext'
import cache from '../data/cache'
import { useNavigation, useRouter, Link } from 'expo-router'

const AuthorComponent = ({ author, disappear }) => {
  const router = useRouter()
  const navigation = useNavigation()
  const { user } = useContext(AppContext)
  const [hidden, setHidden] = useState(false)

  const {
    iHeadshot,
    iCover,
    firstName,
    lastName,
    pseudonym,
    relationship,
    setRelationship,
  } = useAuthor(author, [
    'iHeadshot->270',
    'iCover->270',
    'firstName',
    'lastName',
    'pseudonym',
    'relationship',
  ])

  if (hidden) {
    return null
  }
  return (
    <View row style={{
      width: dimensions.width - 8,
      paddingHorizontal: 4,
      marginVertical: 4,
      height: 64,
    }}>
      <View style={{
        width: `${(2 / 3) * 100}%`,
        height: 64,
      }}>
        <TouchableOpacity onPress={() => {
          router.push({
            pathname: '/profile',
            params: {
              author,
            }
          })
        }}>
        <View style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          paddingLeft: 32,
        }}>
        <Image source={iCover} style={{
            width: '100%',
            height: 64,
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
          }} />
        </View>

          <View style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            marginLeft: 32,
            paddingRight: 8,
            borderRadius: 24,
            marginTop: 16,
          }}>
            <Text style={{
              marginLeft: 32,
              fontFamily: fonts.jockeyOne,
              fontSize: 24,
              paddingHorizontal: 4,
              color: palette.primary0,
            }}>{firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>
          </View>
          <Image source={iHeadshot} style={{
            width: 64,
            height: 64,
            borderRadius: 32,
          }} />

        </TouchableOpacity>
      </View>


      <View center style={{
        width: `${(1 / 3) * 100}%`,
        height: 64,
      }}>
        {relationship === 'none' && (
          <TouchableOpacity onPress={async () => {
            const response = await authorSendRequest(user, author)
            if (response.success) {
              cache.filter([user, 'outgoingFriendRequests'])
              cache.filter([author, 'relationship'])
              cache.filter([author, 'incomingFriendRequests'])
              setRelationship('outgoingFriendRequest')
              if (disappear) setHidden(true)
            }
          }}>
            <View center row>
              <Ionicons name='add-circle' color={palette.complement4} size={24} />

              <Text style={{
                fontFamily: fonts.itim,
                fontSize: 16,
                color: palette.complement4,
              }}>Send Request</Text>
            </View>
          </TouchableOpacity>
        )}
        {relationship === 'outgoingFriendRequest' && (
          <TouchableOpacity onPress={async () => {
            const response = await authorRemoveRequest(user, author)
            if (response.success) {
              cache.filter([user, 'outgoingFriendRequests'])
              cache.filter([author, 'relationship'])
              cache.filter([author, 'incomingFriendRequests'])
              setRelationship('none')
              if (disappear) setHidden(true)
            }
          }}>
            <View center row>
              <Ionicons name='remove-circle' color={palette.complement4} size={24} />

              <Text style={{
                fontFamily: fonts.itim,
                fontSize: 12,
                color: palette.complement4,
              }}>Cancel Request</Text>
            </View>
          </TouchableOpacity>
        )}

        {relationship === 'incomingFriendRequest' && (
          <View style={{
            width: '100%',
            height: '100%',
          }}>
            <View center row style={{
              width: '100%',
              height: '50%',
            }}>
              <TouchableOpacity onPress={async () => {
                const response = await authorAcceptRequest(user, author)
                if (response.success) {
                  cache.filter([user, 'incomingFriendRequests'])
                  cache.filter([author, 'relationship'])
                  cache.filter([author, 'profileBooks'])
                  cache.filter([user, 'friends'])
                  cache.filter(['feed'])
                  cache.filter([author, 'outgoingFriendRequests'])
                  cache.filter([author, 'friends'])
                  setRelationship('friend')
                  if (disappear) setHidden(true)
                }
              }}>
                <View center row style={{
                  width: '100%',
                  height: '100%',
                }}>
                  <Ionicons name='checkmark-circle' color={palette.complement4} size={24} />

                  <Text style={{
                    fontFamily: fonts.itim,
                    fontSize: 12,
                    color: palette.complement4,
                  }}>Accept Request</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{
              width: '100%',
              height: '50%',
            }}>
              <TouchableOpacity onPress={async () => {
                const response = await authorRejectRequest(user, author)
                if (response.success) {
                  cache.filter([user, 'incomingFriendRequests'])
                  cache.filter([author, 'relationship'])
                  cache.filter([author, 'outgoingFriendRequests'])
                  setRelationship('none')
                  if (disappear) setHidden(true)
                }
              }}>
                <View center row style={{
                  width: '100%',
                  height: '100%',
                }}>
                  <Ionicons name='close-circle' color={palette.complement4} size={24} />

                  <Text style={{
                    fontFamily: fonts.itim,
                    fontSize: 12,
                    color: palette.complement4,
                  }}>Reject Request</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {relationship === 'friend' && (
          <TouchableOpacity onPress={async () => {
            const response = await authorRemoveFriend(user, author)
            if (response.success) {
              cache.filter([user, 'friends'])
              cache.filter([author, 'relationship'])
              cache.filter([author, 'profileBooks'])
              cache.filter([author, 'friends'])
              cache.filter(['feed'])
              setRelationship('none')
              if (disappear) setHidden(true)
            }
          }}>
            <View center row>
              <Ionicons name='remove-circle' color={palette.complement4} size={24} />

              <Text style={{
                fontFamily: fonts.itim,
                fontSize: 12,
                color: palette.complement4,
              }}>Remove Friend</Text>
            </View>
          </TouchableOpacity>
        )}

      </View>
    </View>
  )
}

export default AuthorComponent