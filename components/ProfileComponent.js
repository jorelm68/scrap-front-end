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
import { authorAcceptRequest, authorRejectRequest, authorRemoveFriend, authorRemoveRequest, authorSendRequest, bookSaveBook, utilityBookCoordinates } from '../data/api'
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
    relationship,
    setRelationship,
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
    'relationship',
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
    </View>

    <View style={{
      width: dimensions.width,
      height: 48 * 3 + 4 * 2 + 4 * 2,
      padding: 4,
    }}>

      <View row style={{
        width: dimensions.width - 8,
        height: 48 * 3 + 4 * 2,
      }}>

        <View style={{
          width: (dimensions.width - 8) / 3 - 2,
          marginRight: 2,
          height: 48 * 3 + 4 * 2,
        }}>
          <TouchableOpacity onPress={() => {
            setMode('books')
          }}>
            <View center style={{
              backgroundColor: mode === 'books' ? palette.primary4 : palette.primary0,
              borderRadius: 24,
              width: (dimensions.width - 8) / 3 - 2,
              height: 48,
              marginBottom: 4,
            }}>
              <Text style={{
                fontFamily: fonts.itim,
                fontSize: 16,
                color: mode === 'books' ? palette.primary0 : palette.primary4,
              }}>{profileBooks.length} Books</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setMode('miles')
          }}>
            <View center style={{
              backgroundColor: mode === 'miles' ? palette.primary4 : palette.primary0,
              borderRadius: 24,
              width: (dimensions.width - 8) / 3 - 2,
              height: 48,
              marginBottom: 4,
            }}>
              <Text style={{
                fontFamily: fonts.itim,
                fontSize: 16,
                color: mode === 'miles' ? palette.primary0 : palette.primary4,
              }}>{Math.round(miles)} Miles</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setMode('friends')
          }}>
            <View center style={{
              backgroundColor: mode === 'friends' ? palette.primary4 : palette.primary0,
              borderRadius: 24,
              width: (dimensions.width - 8) / 3 - 2,
              height: 48,
            }}>
              <Text style={{
                fontFamily: fonts.itim,
                fontSize: 16,
                color: mode === 'friends' ? palette.primary0 : palette.primary4,
              }}>{friends.length} Friends</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{
          width: (dimensions.width - 8) * (2 / 3) - 2,
          height: 48 * 3 + 4 * 2,
          marginLeft: 2,
        }}>

          <View style={{
            backgroundColor: palette.primary1,
            width: (dimensions.width - 8) * (2 / 3) - 2,
            height: 48 * 2 + 4,
            borderRadius: 8,
            marginBottom: 2,
          }}>
            <Text style={{
              fontFamily: fonts.itim,
              fontSize: 16,
              padding: 4,
              color: palette.primary4,
            }}>{autobiography}</Text>
          </View>

          <View center style={{
            width: (dimensions.width - 8) * (2 / 3) - 2,
            height: 48,
            marginTop: 2,
          }}>
            {relationship === 'incomingFriendRequest' && (
              <View center row style={{
                width: (dimensions.width - 8) * (2 / 3) - 2,
                height: 48,
              }}>

                <ButtonComponent
                  label='Accept Request'
                  icon='checkmark-circle'
                  onPress={async () => {
                    const response = await authorAcceptRequest(user, author)
                    if (response.success) {
                      cache.filter([user, 'incomingFriendRequests'])
                      cache.filter([user, 'relationship'])
                      cache.filter([author, 'relationship'])
                      cache.filter([author, 'profileScraps'])
                      cache.filter([user, 'friends'])
                      cache.filter(['feed'])
                      cache.filter([author, 'outgoingFriendRequests'])
                      cache.filter([author, 'friends'])
                      setRelationship('friend')
                    }
                  }}
                />

                <ButtonComponent
                  label='Reject Request'
                  icon='close-circle'
                  onPress={async () => {
                    const response = await authorRejectRequest(user, author)
                    if (response.success) {
                      cache.filter([user, 'incomingFriendRequests'])
                      cache.filter([user, 'relationship'])
                      cache.filter([author, 'relationship'])
                      cache.filter([author, 'outgoingFriendRequests'])
                      setRelationship('none')
                    }
                  }}
                />
              </View>
            )}

            {relationship === 'outgoingFriendRequest' && (
              <ButtonComponent
                label='Cancel Request'
                icon='remove-circle'
                onPress={async () => {
                  const response = await authorRemoveRequest(user, author)
                  if (response.success) {
                    cache.filter([user, 'outgoingFriendRequests'])
                    cache.filter([author, 'incomingFriendRequests'])
                    cache.filter([user, 'relationship'])
                    cache.filter([author, 'relationship'])
                    setRelationship('none')
                  }
                }}
              />
            )}

            {relationship === 'friend' && (
              <ButtonComponent
                label='Remove Friend'
                icon='person-remove'
                onPress={async () => {
                  const response = await authorRemoveFriend(user, author)
                  if (response.success) {
                    cache.filter([user, 'friends'])
                    cache.filter([author, 'friends'])
                    cache.filter([user, 'relationship'])
                    cache.filter([author, 'relationship'])
                    setRelationship('none')
                  }
                }}
              />
            )}

            {relationship === 'none' && (
              <ButtonComponent
                label='Send Request'
                icon='person-add'
                onPress={async () => {
                  const response = await authorSendRequest(user, author)
                  if (response.success) {
                    cache.filter([user, 'outgoingFriendRequests'])
                    cache.filter([author, 'incomingFriendRequests'])
                    cache.filter([user, 'relationship'])
                    cache.filter([author, 'relationship'])
                    setRelationship('outgoingFriendRequest')
                  }
                }}
              />
            )}

            {relationship === 'self' && (
              <ButtonComponent
                label='Settings'
                icon='settings'
                onPress={async () => {
                  router.push('/settings')
                }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  </View>

  if (mode === 'books') {
    return (
      <ScrollView keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} style={{
        backgroundColor: palette.primary0,
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
  else if (mode === 'miles') {
    return (
      <View style={{
        backgroundColor: palette.primary0,
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
        backgroundColor: palette.primary0,
        width: dimensions.width,
        height: dimensions.height,
      }}>
        {profileHeader}
        <View center row style={{
          marginTop: 16,
        }}>
          <View centerV style={{
            width: dimensions.width / 3,
            height: 64,
            borderBottomColor: palette.primary2,
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
                color: option === 'friends' ? palette.primary2 : palette.primary4,
                textAlign: 'center',
              }}>Friends</Text>
            </TouchableOpacity>
          </View>

          {user === author && (
            <View centerV style={{
              width: dimensions.width / 3,
              height: 64,
              borderBottomColor: palette.primary2,
              borderBottomWidth: option === 'incomingFriendRequests' ? 2 : 0,
            }}>
              <TouchableOpacity onPress={() => {
                setOption('incomingFriendRequests')
              }}>
                <Text style={{
                  fontFamily: fonts.itim,
                  fontSize: 16,
                  padding: 4,
                  color: option === 'incomingFriendRequests' ? palette.primary2 : palette.primary4,
                  textAlign: 'center',
                }}>Incoming Requests</Text>
              </TouchableOpacity>
            </View>
          )}

          {user === author && (
            <View centerV style={{
              width: dimensions.width / 3,
              height: 64,
              borderBottomColor: palette.primary2,
              borderBottomWidth: option === 'outgoingFriendRequests' ? 2 : 0,
            }}>
              <TouchableOpacity onPress={() => {
                setOption('outgoingFriendRequests')
              }}>
                <Text style={{
                  fontFamily: fonts.itim,
                  fontSize: 16,
                  padding: 4,
                  color: option === 'outgoingFriendRequests' ? palette.primary2 : palette.primary4,
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