import { View, Text, Image } from 'react-native-ui-lib'
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
import { authorSendRequest, utilityBookCoordinates } from '../data/api'
import MapView, { Polyline } from 'react-native-maps'
import BookMarker from './BookMarker'
import { getBookCoordinates } from '../data/utility'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'

const ProfileComponent = ({ author }) => {
  const router = useRouter()
  const { user } = useContext(AppContext)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [photosReverse, setPhotosReverse] = useState(false)
  const [mode, setMode] = useState('books')
  const [option, setOption] = useState('friends')
  const [coordinates, setCoordinates] = useState([])

  const {
    iHeadshot,
    iCover,
    firstName,
    autobiography,
    lastName,
    pseudonym,
    profileBooks,
    miles,
    friends,
    incomingFriendRequests,
    outgoingFriendRequests,
  } = useAuthor(author, [
    'iHeadshot->1080',
    'iCover->1080',
    'firstName',
    'autobiography',
    'lastName',
    'pseudonym',
    'profileBooks',
    'miles',
    'friends',
    'incomingFriendRequests',
    'outgoingFriendRequests',
  ])

  const {
    representative,
  } = useBook(profileBooks[0], [
    'representative',
  ])

  const {
    latitude,
    longitude,
  } = useScrap(representative, [
    'latitude',
    'longitude',
  ])

  const [region, setRegion] = useState({
    latitude, // Your initial latitude
    longitude, // Your initial longitude
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  })

  useEffect(() => {
    setRegion({
      latitude, // Your initial latitude
      longitude, // Your initial longitude
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    })
  }, [latitude, longitude])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${firstName} ${lastName}`,
    });
  }, [navigation, firstName, lastName])

  useEffect(() => {
    setName(`${firstName} ${lastName}`)
  }, [firstName, lastName])

  const getCoordinates = async () => {
    const response = await utilityBookCoordinates(profileBooks)
    if (!response.success) {
      Alert.alert('Error', response.error)
    }
    else {
      setCoordinates(response.data.coordinates)
    }
  }
  useEffect(() => {
    getCoordinates()
  }, [profileBooks])

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

  const profileHeader = <View style={{
    height: (dimensions.width / 2) + (dimensions.width / 8 * 3) + (dimensions.width / 8),
  }}>
    <TouchableWithoutFeedback onPress={handleTogglePhotos}>
      <Image source={photosReverse ? iHeadshot : iCover} width={dimensions.width} height={dimensions.width / 2} style={{
        borderBottomRightRadius: 16,
      }} />
    </TouchableWithoutFeedback>

    <View width='100%' row center>
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
          color: palette.primary4,
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
          }} backgroundColor={mode === 'books' ? palette.complement2 : palette.primary1}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 16,
              color: palette.primary4,
            }}>Books</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMap}>
          <View center width={dimensions.width / 4 - 8} height={dimensions.width / 8 - (16 / 3)} style={{
            marginTop: 4,
            borderRadius: 16,
          }} backgroundColor={mode === 'map' ? palette.complement2 : palette.primary1}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 16,
              color: palette.primary4,
            }}>Map</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFriends}>
          <View center width={dimensions.width / 4 - 8} height={dimensions.width / 8 - (16 / 3)} style={{
            marginVertical: 4,
            borderRadius: 16,
          }} backgroundColor={mode === 'friends' ? palette.complement2 : palette.primary1}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 16,
              color: palette.primary4,
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
              color: palette.primary4,
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
              color: palette.primary4,
            }}>
              {profileBooks.length}
            </Text>
          </View>
          <Text style={{
            fontFamily: fonts.itim,
            fontSize: 14,
            marginRight: 8,
            color: palette.primary4,
          }}>Books</Text>

          <View center width={dimensions.width / 8 - (16 / 3)} height={dimensions.width / 8 - (16 / 3)} style={{
            borderRadius: dimensions.width / 8 - (16 / 3) / 2,
            backgroundColor: palette.complement2,
            marginRight: 2,
          }}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 20,
              color: palette.primary4,
            }}>
              {Math.round(miles)}
            </Text>
          </View>
          <Text style={{
            fontFamily: fonts.itim,
            fontSize: 14,
            marginRight: 8,
            color: palette.primary4,
          }}>Miles</Text>

          <View center width={dimensions.width / 8 - (16 / 3)} height={dimensions.width / 8 - (16 / 3)} style={{
            borderRadius: dimensions.width / 8 - (16 / 3) / 2,
            backgroundColor: palette.complement2,
            marginRight: 2,
          }}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 20,
              color: palette.primary4,
            }}>
              {friends.length}
            </Text>
          </View>
          <Text style={{
            fontFamily: fonts.itim,
            fontSize: 14,
            color: palette.primary4,
          }}>Friends</Text>
        </View>
      </View>
    </View>

  </View>

  if (mode === 'books') {
    return (
      <ScrollView keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} style={{
        backgroundColor: palette.primary1,
        width: dimensions.width,
        height: dimensions.height,
      }}>
        {profileHeader}

        <View style={{
          marginTop: 16,
        }}>
          {profileBooks && profileBooks.map((book) => {
            return (
              <BookComponent book={book} key={book} clickable showAuthor />
            )
          })}
        </View>

      </ScrollView>
    )
  }
  else if (mode === 'map') {
    return (
      <View style={{
        backgroundColor: palette.primary1,
        width: dimensions.width,
        height: dimensions.height,
      }}>
        {profileHeader}

        <MapView
          region={region}
          style={{
            width: dimensions.width,
            marginTop: 16,
            height: dimensions.height - ((dimensions.width / 2) + (dimensions.width / 8 * 3) + (dimensions.width / 8)) - 90 - 16,
          }}
        >
          {profileBooks && profileBooks.map((book) => {
            return (
              <TouchableOpacity key={book} onPress={() => {
                router.push({
                  pathname: '/book',
                  params: {
                    book,
                  }
                })
              }}>
                <BookMarker book={book} />
              </TouchableOpacity>
            )
          })}

          <Polyline
            coordinates={coordinates}
            strokeColor='red' // Change this to the desired color
            strokeWidth={2}
          />
        </MapView>
      </View>
    )
  }
  else {
    return (
      <ScrollView keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} style={{
        backgroundColor: palette.primary1,
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
                color: option === 'friends' ? palette.complement0 : palette.primary4,
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
                  color: option === 'incomingFriendRequests' ? palette.complement0 : palette.primary4,
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
                  color: option === 'outgoingFriendRequests' ? palette.complement0 : palette.primary4,
                  textAlign: 'center',
                }}>Outgoing Requests</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {option === 'friends' && friends.map((friend) => {
          return (
            <AuthorComponent author={friend} key={friend} disappear />
          )
        })}

        {option === 'incomingFriendRequests' && incomingFriendRequests.map((request) => {
          return (
            <AuthorComponent author={request} key={request} disappear />
          )
        })}

        {option === 'outgoingFriendRequests' && outgoingFriendRequests.map((request) => {
          return (
            <AuthorComponent author={request} key={request} disappear />
          )
        })}
      </ScrollView >
    )
  }
}

export default ProfileComponent