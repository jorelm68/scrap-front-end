import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
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

const Page = ({ author, disappear }) => {
    const router = useRouter()
    const { palette, user, paused, setPaused } = useContext(AppContext)
    const tab = utility.getTab(usePathname())
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
                    router.push(`/${tab}/author/${author}`)
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
                            color: '#CCCCCC',
                        }}>{utility.formatName(firstName, lastName, pseudonym)}</Text>
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
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await api.authorSendRequest(user, author)
                        if (response.success) {
                            cache.filter([user, 'outgoingFriendRequests'])
                            cache.filter([author, 'relationship'])
                            cache.filter([author, 'incomingFriendRequests'])
                            setRelationship('outgoingFriendRequest')
                            if (disappear) setHidden(true)
                        }
                        setPaused(false)
                    }}>
                        <View center row>
                            <Ionicons name='add-circle' color={palette.color6} size={24} />

                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 16,
                                color: palette.color6,
                            }}>Send Request</Text>
                        </View>
                    </TouchableOpacity>
                )}
                {relationship === 'outgoingFriendRequest' && (
                    <TouchableOpacity onPress={async () => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await api.authorRemoveRequest(user, author)
                        if (response.success) {
                            cache.filter([user, 'outgoingFriendRequests'])
                            cache.filter([author, 'relationship'])
                            cache.filter([author, 'incomingFriendRequests'])
                            setRelationship('none')
                            if (disappear) setHidden(true)
                        }
                        setPaused(false)
                    }}>
                        <View center row>
                            <Ionicons name='remove-circle' color={palette.color6} size={24} />

                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                color: palette.color6,
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
                                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                setPaused(true)
                                const response = await api.authorAcceptRequest(user, author)
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
                                setPaused(false)
                            }}>
                                <View center row style={{
                                    width: '100%',
                                    height: '100%',
                                }}>
                                    <Ionicons name='checkmark-circle' color={palette.color6} size={24} />

                                    <Text style={{
                                        fontFamily: fonts.itim,
                                        fontSize: 12,
                                        color: palette.color6,
                                    }}>Accept Request</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            width: '100%',
                            height: '50%',
                        }}>
                            <TouchableOpacity onPress={async () => {
                                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                setPaused(true)
                                const response = await api.authorRejectRequest(user, author)
                                if (response.success) {
                                    cache.filter([user, 'incomingFriendRequests'])
                                    cache.filter([author, 'relationship'])
                                    cache.filter([author, 'outgoingFriendRequests'])
                                    setRelationship('none')
                                    if (disappear) setHidden(true)
                                }
                                setPaused(false)
                            }}>
                                <View center row style={{
                                    width: '100%',
                                    height: '100%',
                                }}>
                                    <Ionicons name='close-circle' color={palette.color6} size={24} />

                                    <Text style={{
                                        fontFamily: fonts.itim,
                                        fontSize: 12,
                                        color: palette.color6,
                                    }}>Reject Request</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {relationship === 'friend' && (
                    <TouchableOpacity onPress={async () => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await api.authorRemoveFriend(user, author)
                        if (response.success) {
                            cache.filter([user, 'friends'])
                            cache.filter([author, 'relationship'])
                            cache.filter([author, 'profileBooks'])
                            cache.filter([author, 'friends'])
                            cache.filter(['feed'])
                            setRelationship('none')
                            if (disappear) setHidden(true)
                        }
                        setPaused(false)
                    }}>
                        <View center row>
                            <Ionicons name='remove-circle' color={palette.color6} size={24} />

                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                color: palette.color6,
                            }}>Remove Friend</Text>
                        </View>
                    </TouchableOpacity>
                )}

            </View>
        </View>
    )
}

export default Page