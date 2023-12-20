import { View, Text, Image, Colors } from 'react-native-ui-lib'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import { dimensions, palette, fonts } from '../data/styles'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import ButtonComponent from '../components/ButtonComponent'
import { Ionicons } from '@expo/vector-icons'
import BookComponent from '../components/BookComponent'
import cache from '../data/cache'
import AuthorComponent from '../components/AuthorComponent'
import { authorSendRequest } from '../data/api'

const ProfileComponent = ({ author }) => {
  const router = useRouter()
  const { user } = useContext(AppContext)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [photosReverse, setPhotosReverse] = useState(false)
  const [mode, setMode] = useState('books')
  const [option, setOption] = useState('friends')
  const miles = 10

  const {
    iHeadshot,
    iCover,
    firstName,
    autobiography,
    lastName,
    pseudonym,
    publicBooks,
    // miles,
    friends,
    incomingFriendRequests,
    outgoingFriendRequests,
    relationship,
  } = useAuthor(author, [
    'iHeadshot->1080',
    'iCover->1080',
    'firstName',
    'autobiography',
    'lastName',
    'pseudonym',
    'publicBooks',
    // 'miles',
    'friends',
    'incomingFriendRequests',
    'outgoingFriendRequests',
    'relationship',
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

  const handleBooks = () => {
    setMode('books')
  }
  const handleMap = () => {
    setMode('map')
  }
  const handleFriends = () => {
    setMode('friends')
  }

  const handleSettings = () => {
    router.push('/settings')
  }

  const profileHeader = <View>
    <TouchableWithoutFeedback onPress={handleTogglePhotos}>
      <Image source={photosReverse ? iHeadshot : iCover} width={dimensions.width} height={dimensions.width / 2} style={{
        borderBottomRightRadius: 16,
      }} />
    </TouchableWithoutFeedback>

    <View width='100%' flex row center>
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
          width: dimensions.width * (1 / 2 + 1 / 8),
          fontFamily: fonts.jockeyOne,
          color: palette.secondary14,
        }}>{name}</Text>
      </TouchableOpacity>

      {user === author && (
        <TouchableOpacity onPress={handleSettings} style={{
          width: dimensions.width / 8 - 8,
          alignItems: 'center',
        }}>
          <Ionicons name='settings' color={palette.complement4} size={24} />
        </TouchableOpacity>
      )}
    </View>

    <View row>
      <View centerH width={dimensions.width / 4} height={(dimensions.width / 8) * 3}>
        <TouchableOpacity onPress={handleBooks}>
          <View center width={dimensions.width / 4 - 8} height={dimensions.width / 8 - (16 / 3)} style={{
            marginTop: 4,
            borderRadius: 16,
          }} backgroundColor={mode === 'books' ? palette.complement2 : palette.secondary11}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 16,
              color: palette.secondary14,
            }}>Books</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMap}>
          <View center width={dimensions.width / 4 - 8} height={dimensions.width / 8 - (16 / 3)} style={{
            marginTop: 4,
            borderRadius: 16,
          }} backgroundColor={mode === 'map' ? palette.complement2 : palette.secondary11}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 16,
              color: palette.secondary14,
            }}>Map</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFriends}>
          <View center width={dimensions.width / 4 - 8} height={dimensions.width / 8 - (16 / 3)} style={{
            marginVertical: 4,
            borderRadius: 16,
          }} backgroundColor={mode === 'friends' ? palette.complement2 : palette.secondary11}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 16,
              color: palette.secondary14,
            }}>Friends</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View width={dimensions.width * (3 / 4)} height={(dimensions.width / 8) * 3}>
        <View height={dimensions.width / 4} style={{ padding: 4, paddingLeft: 0 }}>
          <View style={{
            backgroundColor: palette.complement2,
            borderRadius: 8,
          }}>
            <Text style={{
              padding: 4,
              fontFamily: fonts.itim,
              fontSize: 14,
              height: '100%',
              color: palette.secondary14,
            }}>
              {autobiography}
            </Text>
          </View>

        </View>

        <View row center height={dimensions.width / 8} style={{
          marginRight: 4,
        }}>
          <View center width={dimensions.width / 8 - (16 / 3)} height={dimensions.width / 8 - (16 / 3)} style={{
            borderRadius: dimensions.width / 8 - (16 / 3) / 2,
            backgroundColor: palette.complement2,
            marginRight: 2,
          }}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 20,
              color: palette.secondary14,
            }}>
              {publicBooks.length}
            </Text>
          </View>
          <Text style={{
            fontFamily: fonts.itim,
            fontSize: 14,
            marginRight: 8,
            color: palette.secondary14,
          }}>Books</Text>

          <View center width={dimensions.width / 8 - (16 / 3)} height={dimensions.width / 8 - (16 / 3)} style={{
            borderRadius: dimensions.width / 8 - (16 / 3) / 2,
            backgroundColor: palette.complement2,
            marginRight: 2,
          }}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 20,
              color: palette.secondary14,
            }}>
              {miles}
            </Text>
          </View>
          <Text style={{
            fontFamily: fonts.itim,
            fontSize: 14,
            marginRight: 8,
            color: palette.secondary14,
          }}>Miles</Text>

          <View center width={dimensions.width / 8 - (16 / 3)} height={dimensions.width / 8 - (16 / 3)} style={{
            borderRadius: dimensions.width / 8 - (16 / 3) / 2,
            backgroundColor: palette.complement2,
            marginRight: 2,
          }}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 20,
              color: palette.secondary14,
            }}>
              {friends.length}
            </Text>
          </View>
          <Text style={{
            fontFamily: fonts.itim,
            fontSize: 14,
            color: palette.secondary14,
          }}>Friends</Text>
        </View>
      </View>
    </View>

  </View>

  if (mode === 'books') {
    return (
      <ScrollView style={{
        backgroundColor: palette.secondary11,
        width: dimensions.width,
        height: dimensions.height,
      }}>
        {profileHeader}

        <View style={{
          marginTop: 16,
        }}>
          {publicBooks && publicBooks.map((book) => {
            return (
              <BookComponent book={book} key={book} clickable />
            )
          })}
        </View>

      </ScrollView>
    )
  }
  else if (mode === 'map') {
    return (
      <ScrollView style={{
        backgroundColor: palette.secondary11,
        width: dimensions.width,
        height: dimensions.height,
      }}>
        {profileHeader}
      </ScrollView>
    )
  }
  else {
    return (
      <ScrollView style={{
        backgroundColor: palette.secondary11,
        width: dimensions.width,
        height: dimensions.height,
      }}>
        {profileHeader}
        <View center row>
          <View centerV style={{
            width: dimensions.width / 3,
            height: 64,
            borderBottomColor: palette.complement0,
            borderBottomWidth: option === 'friends' ? 2 : 0,
            marginBottom: 4,
          }}>
            <TouchableOpacity onPress={() => {
              setOption('friends')
            }}>
              <Text style={{
                fontFamily: fonts.itim,
                fontSize: 16,
                padding: 4,
                color: option === 'friends' ? palette.complement0 : palette.secondary14,
                textAlign: 'center',
              }}>Friends</Text>
            </TouchableOpacity>
          </View>

          {user === author && (
            <View centerV style={{
              width: dimensions.width / 3,
              height: 64,
              borderBottomColor: palette.complement0,
              borderBottomWidth: option === 'incomingFriendRequests' ? 2 : 0,
            }}>
              <TouchableOpacity onPress={() => {
                setOption('incomingFriendRequests')
              }}>
                <Text style={{
                  fontFamily: fonts.itim,
                  fontSize: 16,
                  padding: 4,
                  color: option === 'incomingFriendRequests' ? palette.complement0 : palette.secondary14,
                  textAlign: 'center',
                }}>Incoming Requests</Text>
              </TouchableOpacity>
            </View>
          )}

          {user === author && (
            <View centerV style={{
              width: dimensions.width / 3,
              height: 64,
              borderBottomColor: palette.complement0,
              borderBottomWidth: option === 'outgoingFriendRequests' ? 2 : 0,
            }}>
              <TouchableOpacity onPress={() => {
                setOption('outgoingFriendRequests')
              }}>
                <Text style={{
                  fontFamily: fonts.itim,
                  fontSize: 16,
                  padding: 4,
                  color: option === 'outgoingFriendRequests' ? palette.complement0 : palette.secondary14,
                  textAlign: 'center',
                }}>Outgoing Requests</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {option === 'friends' && friends.map((friend) => {
          return (
            <AuthorComponent author={friend} key={friend} />
          )
        })}

        {option === 'incomingFriendRequests' && incomingFriendRequests.map((request) => {
          return (
            <AuthorComponent author={request} key={request} />
          )
        })}

        {option === 'outgoingFriendRequests' && outgoingFriendRequests.map((request) => {
          return (
            <AuthorComponent author={request} key={request} />
          )
        })}
      </ScrollView >
    )
  }
}

export default ProfileComponent