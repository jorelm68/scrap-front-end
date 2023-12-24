import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native'
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
import AuthorSmall from './AuthorSmall'

const Page = ({ author }) => {
    const { palette, user } = useContext(AppContext)
    const [option, setOption] = useState('friends')

    const {
        friends,
        incomingFriendRequests,
        outgoingFriendRequests,
    } = useAuthor(author, [
        'friends',
        'incomingFriendRequests',
        'outgoingFriendRequests',
    ])    

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

export default Page