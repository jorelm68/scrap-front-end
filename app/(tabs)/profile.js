import { View, Text, Image, Colors } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import useAuthor from '../../hooks/useAuthor'
import { colors, dimensions, styles } from '../../data/styles'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ButtonComponent from '../../components/ButtonComponent'
import { Ionicons } from '@expo/vector-icons'
import BookComponent from '../../components/BookComponent'
import cache from '../../data/cache'
import AuthorComponent from '../../components/AuthorComponent'

const Profile = () => {
  const router = useRouter()
  const { user } = useContext(AppContext)
  const params = useLocalSearchParams()
  let author = params.author
  if (!author) author = user
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
    lastName,
    pseudonym,
    publicBooks,
    // miles,
    friends,
    incomingFriendRequests,
    outgoingFriendReqeusts,
    relationship,
  } = useAuthor(author, [
    'iHeadshot->1080',
    'iCover->1080',
    'firstName',
    'lastName',
    'pseudonym',
    'publicBooks',
    // 'miles',
    'friends',
    'incomingFriendRequests',
    'outgoingFriendRequests',
    'relationship'
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
          fontFamily: styles.text2,
          color: colors.default,
        }}>{name}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSettings} style={{
        width: dimensions.width / 8 - 8,
        alignItems: 'center',
      }}>
        <Ionicons name='settings' color={colors.interaction} size={24} />
      </TouchableOpacity>

    </View>

    <View row>
      <View centerH width={dimensions.width / 4} height={(dimensions.width / 8) * 3}>
        <TouchableOpacity onPress={handleBooks}>
          <View center width={dimensions.width / 4 - 8} height={dimensions.width / 8 - (16 / 3)} style={{
            marginTop: 4,
            borderRadius: 16,
          }} backgroundColor={colors.interaction}>
            <Text style={{
              fontFamily: styles.text1,
              fontSize: 16,
              color: colors.default,
            }}>Books</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMap}>
          <View center width={dimensions.width / 4 - 8} height={dimensions.width / 8 - (16 / 3)} style={{
            marginTop: 4,
            borderRadius: 16,
          }} backgroundColor={colors.interaction}>
            <Text style={{
              fontFamily: styles.text1,
              fontSize: 16,
              color: colors.default,
            }}>Map</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFriends}>
          <View center width={dimensions.width / 4 - 8} height={dimensions.width / 8 - (16 / 3)} style={{
            marginVertical: 4,
            borderRadius: 16,
          }} backgroundColor={colors.interaction}>
            <Text style={{
              fontFamily: styles.text1,
              fontSize: 16,
              color: colors.default,
            }}>Friends</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View width={dimensions.width * (3 / 4)} height={(dimensions.width / 8) * 3}>
        <View height={dimensions.width / 4} style={{ padding: 4, paddingLeft: 0 }}>
          <View backgroundColor={Colors.purple10} style={{
            backgroundColor: colors.secondary,
            borderRadius: 8,
          }}>
            <Text style={{
              padding: 4,
              fontFamily: styles.text1,
              fontSize: 14,
              height: '100%',
              color: colors.default,
            }}>
              Hello World. This is my first description.
            </Text>
          </View>

        </View>

        <View row center height={dimensions.width / 8} style={{
          marginRight: 4,
        }}>
          <View backgroundColor={colors.secondary} center width={dimensions.width / 8 - (16 / 3)} height={dimensions.width / 8 - (16 / 3)} style={{
            borderRadius: dimensions.width / 8 - (16 / 3) / 2,
          }}>
            <Text style={{
              fontFamily: styles.text1,
              fontSize: 20,
              color: colors.default,
            }}>
              {publicBooks.length}
            </Text>
          </View>
          <Text style={{
            fontFamily: styles.text1,
            fontSize: 14,
            marginRight: 8,
            color: colors.default,
          }}>Books</Text>

          <View backgroundColor={colors.secondary} center width={dimensions.width / 8 - (16 / 3)} height={dimensions.width / 8 - (16 / 3)} style={{
            borderRadius: dimensions.width / 8 - (16 / 3) / 2,
          }}>
            <Text style={{
              fontFamily: styles.text1,
              fontSize: 20,
              color: colors.default,
            }}>
              {miles}
            </Text>
          </View>
          <Text style={{
            fontFamily: styles.text1,
            fontSize: 14,
            marginRight: 8,
            color: colors.default,
          }}>Miles</Text>

          <View backgroundColor={colors.secondary} center width={dimensions.width / 8 - (16 / 3)} height={dimensions.width / 8 - (16 / 3)} style={{
            borderRadius: dimensions.width / 8 - (16 / 3) / 2,
          }}>
            <Text style={{
              fontFamily: styles.text1,
              fontSize: 20,
              color: colors.default,
            }}>
              {friends.length}
            </Text>
          </View>
          <Text style={{
            fontFamily: styles.text1,
            fontSize: 14,
            color: colors.default,
          }}>Friends</Text>
        </View>
      </View>
    </View>

  </View>

  if (mode === 'books') {
    return (
      <ScrollView style={{
        backgroundColor: colors.background,
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
        backgroundColor: colors.background,
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
        backgroundColor: colors.background,
        width: dimensions.width,
        height: dimensions.height,
      }}>
        {profileHeader}
        <View style={{
          marginTop: 16,
        }}>
          <ButtonComponent
            label='friend ariel'
            size='large'
            onPress={() => {
              console.log('friended ariel')
            }}
          />

          <View row>
            <View centerV style={{
              width: dimensions.width / 3,
              height: 64,
              borderBottomColor: colors.interaction,
              borderBottomWidth: option === 'friends' ? 2 : 0,
            }}>
              <TouchableOpacity onPress={() => {
                setOption('friends')
              }}>
                <Text style={{
                  fontFamily: styles.text1,
                  fontSize: 18,
                  color: option === 'friends' ? colors.interaction : colors.default,
                  textAlign: 'center',
                }}>Friends</Text>
              </TouchableOpacity>
            </View>

            <View centerV style={{
              width: dimensions.width / 3,
              height: 64,
              borderBottomColor: colors.interaction,
              borderBottomWidth: option === 'incomingFriendRequests' ? 2 : 0,
            }}>
              <TouchableOpacity onPress={() => {
                setOption('incomingFriendRequests')
              }}>
                <Text style={{
                  fontFamily: styles.text1,
                  fontSize: 18,
                  color: option === 'incomingFriendRequests' ? colors.interaction : colors.default,
                  textAlign: 'center',
                }}>Incoming Requests</Text>
              </TouchableOpacity>
            </View>

            <View centerV style={{
              width: dimensions.width / 3,
              height: 64,
              borderBottomColor: colors.interaction,
              borderBottomWidth: option === 'outgoingFriendRequests' ? 2 : 0,
            }}>
              <TouchableOpacity onPress={() => {
                setOption('outgoingFriendRequests')
              }}>
                <Text style={{
                  fontFamily: styles.text1,
                  fontSize: 18,
                  color: option === 'outgoingFriendRequests' ? colors.interaction : colors.default,
                  textAlign: 'center',
                }}>Outgoing Requests</Text>
              </TouchableOpacity>
            </View>
          </View>


          {friends && friends.map((friend) => {
            return (
              <AuthorComponent author={friend} key={friend} />
            )
          })}
        </View>
      </ScrollView >
    )
  }
}

export default Profile