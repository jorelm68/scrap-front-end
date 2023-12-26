import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, usePathname, useRouter } from 'expo-router'
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib'
import MapView, { Polyline, Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import { dimensions, fonts } from '../data/styles'
import cache from '../data/cache'
import api from '../data/api'
import utility from '../data/utility'
import BookList from './BookList'
import BookSmall from './BookSmall'
import Button from './Button'
import AuthorSmall from './AuthorSmall'
import BookMarker from './BookMarker'

const Component = ({ author }) => {
    const router = useRouter()
    const { user, paused, setPaused, palette } = useContext(AppContext)
    const pathname = usePathname()
    const tab = utility.getTab(pathname)
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
        latitude,
        longitude,
    })

    useEffect(() => {
        setRegion({
            latitude,
            longitude,
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
        const response = await api.utility.bookCoordinates(profileBooks)
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

    const ProfileHeader = () => {
        return (
            <View style={{
                width: dimensions.width,
                height: (dimensions.width / 2) + (dimensions.width / 4 / 2) + (48 * 3 + 4 * 2 + 4 * 2),
                marginBottom: 8,
            }}>
                <TouchableWithoutFeedback onPress={() => {
                    setPhotosReverse(!photosReverse)
                }}>
                    <Image source={photosReverse ? iHeadshot : iCover} width={dimensions.width} height={dimensions.width / 2} style={{
                        borderBottomRightRadius: 16,
                    }} />
                </TouchableWithoutFeedback>

                <View row centerV style={{
                    width: dimensions.width,
                }}>
                    <TouchableWithoutFeedback onPress={() => {
                        setPhotosReverse(!photosReverse)
                    }}>
                        <Image source={photosReverse ? iCover : iHeadshot} width={dimensions.width / 4} height={dimensions.width / 4} style={{
                            borderRadius: dimensions.width / 8,
                            marginTop: -(dimensions.width / 8),
                        }} />
                    </TouchableWithoutFeedback>

                    <TouchableOpacity onPress={() => {
                        if (name === pseudonym) {
                            setName(`${firstName} ${lastName}`)
                        }
                        else {
                            setName(pseudonym)
                        }
                    }}>
                        <Text style={{
                            height: dimensions.width / 8,
                            marginLeft: 8,
                            fontSize: 28,
                            width: dimensions.width * (1 / 2 + 1 / 8),
                            fontFamily: fonts.jockeyOne,
                            color: palette.color5,
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
                                    backgroundColor: palette.color1,
                                    borderColor: palette.accent,
                                    borderBottomWidth: mode === 'books' ? 2 : 0,
                                    borderRadius: 24,
                                    width: (dimensions.width - 8) / 3 - 2,
                                    height: 48,
                                    marginBottom: 4,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.itim,
                                        fontSize: 16,
                                        color: mode === 'books' ? palette.accent : palette.color5,
                                    }}>{profileBooks.length} Book{profileBooks.length === 1 ? '' : 's'}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setMode('miles')
                            }}>
                                <View center style={{
                                    backgroundColor: palette.color1,
                                    borderColor: palette.accent,
                                    borderBottomWidth: mode === 'miles' ? 2 : 0,
                                    borderRadius: 24,
                                    width: (dimensions.width - 8) / 3 - 2,
                                    height: 48,
                                    marginBottom: 4,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.itim,
                                        fontSize: 16,
                                        color: mode === 'miles' ? palette.accent : palette.color5,
                                    }}>{Math.round(miles)} Mile{Math.round(miles) === 1 ? '' : 's'}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setMode('friends')
                            }}>
                                <View center style={{
                                    backgroundColor: palette.color1,
                                    borderColor: palette.accent,
                                    borderBottomWidth: mode === 'friends' ? 2 : 0,
                                    borderRadius: 24,
                                    width: (dimensions.width - 8) / 3 - 2,
                                    height: 48,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.itim,
                                        fontSize: 16,
                                        color: mode === 'friends' ? palette.accent : palette.color5,
                                    }}>{friends.length} Friend{friends.length === 1 ? '' : 's'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            width: (dimensions.width - 8) * (2 / 3) - 2,
                            height: 48 * 3 + 4 * 2,
                            marginLeft: 2,
                        }}>

                            <View style={{
                                backgroundColor: palette.color2,
                                width: (dimensions.width - 8) * (2 / 3) - 2,
                                height: 48 * 2 + 4,
                                borderRadius: 8,
                                marginBottom: 2,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.itim,
                                    fontSize: 16,
                                    padding: 4,
                                    color: palette.color5,
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

                                        <View style={{
                                            marginRight: 2,
                                        }}>
                                            <Button
                                                label='Accept Request'
                                                icon='checkmark-circle'
                                                onPress={async () => {
                                                    if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                                    setPaused(true)
                                                    const response = await api.author.acceptRequest(user, author)
                                                    if (response.success) {
                                                        cache.filter([user, 'incomingFriendRequests'])
                                                        cache.filter([user, 'relationship'])
                                                        cache.filter([author, 'relationship'])
                                                        cache.filter([author, 'profileBooks'])
                                                        cache.filter([user, 'friends'])
                                                        cache.filter(['feed'])
                                                        cache.filter([author, 'outgoingFriendRequests'])
                                                        cache.filter([author, 'friends'])
                                                        setRelationship('friend')
                                                    }
                                                    setPaused(false)
                                                }}
                                            />
                                        </View>

                                        <View style={{
                                            marginLeft: 2,
                                        }}>
                                        <Button
                                            label='Reject Request'
                                            icon='close-circle'
                                            onPress={async () => {
                                                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                                setPaused(true)
                                                const response = await api.author.rejectRequest(user, author)
                                                if (response.success) {
                                                    cache.filter([user, 'incomingFriendRequests'])
                                                    cache.filter([user, 'relationship'])
                                                    cache.filter([author, 'relationship'])
                                                    cache.filter([author, 'outgoingFriendRequests'])
                                                    setRelationship('none')
                                                }
                                                setPaused(false)
                                            }}
                                        />
                                        </View>
                                    </View>
                                )}

                                {relationship === 'outgoingFriendRequest' && (
                                    <Button
                                        label='Cancel Request'
                                        icon='remove-circle'
                                        onPress={async () => {
                                            if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                            setPaused(true)
                                            const response = await api.author.removeRequest(user, author)
                                            if (response.success) {
                                                cache.filter([user, 'outgoingFriendRequests'])
                                                cache.filter([author, 'incomingFriendRequests'])
                                                cache.filter([user, 'relationship'])
                                                cache.filter([author, 'relationship'])
                                                setRelationship('none')
                                            }
                                            setPaused(false)
                                        }}
                                    />
                                )}

                                {relationship === 'friend' && (
                                    <Button
                                        label='Remove Friend'
                                        icon='person-remove'
                                        onPress={async () => {
                                            if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                            setPaused(true)
                                            const response = await api.author.removeFriend(user, author)
                                            if (response.success) {
                                                cache.filter([user, 'friends'])
                                                cache.filter([author, 'friends'])
                                                cache.filter([user, 'relationship'])
                                                cache.filter([author, 'relationship'])
                                                setRelationship('none')
                                            }
                                            setPaused(false)
                                        }}
                                    />
                                )}

                                {relationship === 'none' && (
                                    <Button
                                        label='Send Request'
                                        icon='person-add'
                                        onPress={async () => {
                                            if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                            setPaused(true)
                                            const response = await api.author.sendRequest(user, author)
                                            if (response.success) {
                                                cache.filter([user, 'outgoingFriendRequests'])
                                                cache.filter([author, 'incomingFriendRequests'])
                                                cache.filter([user, 'relationship'])
                                                cache.filter([author, 'relationship'])
                                                setRelationship('outgoingFriendRequest')
                                            }
                                            setPaused(false)
                                        }}
                                    />
                                )}

                                {relationship === 'self' && (
                                    <Button
                                        label='Settings'
                                        icon='settings'
                                        onPress={async () => {
                                            const route = pathname === '/profile' ? `/${tab}/settings` : `${tab}/author/settings`
                                            router.navigate({
                                                pathname: route,
                                            })
                                        }}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    if (mode === 'books') {
        return (
            <BookList
                header={ProfileHeader}
                headerHeight={(dimensions.width / 2) + (dimensions.width / 4 / 2) + (48 * 3 + 4 * 2 + 4 * 2)}
                books={profileBooks}
                renderItem={(book) => {
                    return (
                        <BookSmall book={book} key={book} clickable />
                    )
                }}
            />
        )
    }
    else if (mode === 'miles') {
        return (
            <View style={{
                backgroundColor: palette.color1,
                width: dimensions.width,
                height: dimensions.height,
            }}>
                <ProfileHeader />

                <MapView
                    region={region}
                    style={{
                        width: dimensions.width,
                        borderRadius: 8,
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
                        strokeColor={palette.accent}
                        strokeWidth={2}
                    />
                </MapView>
            </View>
        )
    }
    else {
        return (
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} style={{
                backgroundColor: palette.color1,
                width: dimensions.width,
                height: dimensions.height,
            }}>
                <ProfileHeader />
                <View center row>
                    <View centerV style={{
                        width: dimensions.width / 3,
                        height: 64,
                        borderBottomColor: palette.accent,
                        borderBottomWidth: option === 'friends' ? 2 : 0,
                        borderRadius: 24,
                        marginBottom: 4,
                    }}>
                        <TouchableOpacity onPress={() => {
                            setOption('friends')
                        }}>
                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 16,
                                padding: 4,
                                color: option === 'friends' ? palette.accent : palette.color5,
                                textAlign: 'center',
                            }}>Friends</Text>
                        </TouchableOpacity>
                    </View>

                    {user === author && (
                        <View centerV style={{
                            width: dimensions.width / 3,
                            height: 64,
                            borderBottomColor: palette.accent,
                            borderBottomWidth: option === 'incomingFriendRequests' ? 2 : 0,
                            borderRadius: 24,
                        }}>
                            <TouchableOpacity onPress={() => {
                                setOption('incomingFriendRequests')
                            }}>
                                <Text style={{
                                    fontFamily: fonts.itim,
                                    fontSize: 16,
                                    padding: 4,
                                    color: option === 'incomingFriendRequests' ? palette.accent : palette.color5,
                                    textAlign: 'center',
                                }}>Incoming Requests</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {user === author && (
                        <View centerV style={{
                            width: dimensions.width / 3,
                            height: 64,
                            borderBottomColor: palette.accent,
                            borderBottomWidth: option === 'outgoingFriendRequests' ? 2 : 0,
                            borderRadius: 24,
                        }}>
                            <TouchableOpacity onPress={() => {
                                setOption('outgoingFriendRequests')
                            }}>
                                <Text style={{
                                    fontFamily: fonts.itim,
                                    fontSize: 16,
                                    padding: 4,
                                    color: option === 'outgoingFriendRequests' ? palette.accent : palette.color5,
                                    textAlign: 'center',
                                }}>Outgoing Requests</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {option === 'friends' && friends.map((friend) => {
                    return (
                        <AuthorSmall author={friend} key={friend} disappear />
                    )
                })}

                {option === 'incomingFriendRequests' && incomingFriendRequests.map((request) => {
                    return (
                        <AuthorSmall author={request} key={request} disappear />
                    )
                })}

                {option === 'outgoingFriendRequests' && outgoingFriendRequests.map((request) => {
                    return (
                        <AuthorSmall author={request} key={request} disappear />
                    )
                })}
            </ScrollView>
        )
    }
}

export default Component