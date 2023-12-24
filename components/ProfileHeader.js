import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { View, Text, Image } from 'react-native-ui-lib'
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

const Page = ({ author }) => {
    const navigation = useNavigation()
    const { palette, user, paused, setPaused } = useContext(AppContext)
    const [name, setName] = useState('')
    const [photosReverse, setPhotosReverse] = useState(false)
    const [mode, setMode] = useState('books')
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

    useEffect(() => {
        setName(`${firstName} ${lastName}`)
    }, [firstName, lastName])

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
                                }}>{profileBooks.length} Books</Text>
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

                                    <Button
                                        label='Accept Request'
                                        icon='checkmark-circle'
                                        onPress={async () => {
                                            if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                            setPaused(true)
                                            const response = await api.authorAcceptRequest(user, author)
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

                                    <Button
                                        label='Reject Request'
                                        icon='close-circle'
                                        onPress={async () => {
                                            if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                            setPaused(true)
                                            const response = await api.authorRejectRequest(user, author)
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
                            )}

                            {relationship === 'outgoingFriendRequest' && (
                                <Button
                                    label='Cancel Request'
                                    icon='remove-circle'
                                    onPress={async () => {
                                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                        setPaused(true)
                                        const response = await api.authorRemoveRequest(user, author)
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
                                        const response = await api.authorRemoveFriend(user, author)
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
                                        const response = await api.authorSendRequest(user, author)
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
                                        navigation.navigate('/settings')
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

export default Page