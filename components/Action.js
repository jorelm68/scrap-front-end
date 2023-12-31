import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, usePathname, router } from 'expo-router'
import { View, Text, Image, TouchableOpacity, Drawer } from 'react-native-ui-lib'
import MapView, { Polyline, Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import useAction from '../hooks/useAction'
import { dimensions, fonts } from '../data/styles'
import cache from '../data/cache'
import api from '../data/api'
import utility from '../data/utility'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Component = ({ action, handleRemove }) => {
    const { palette, user } = useContext(AppContext)
    const tab = utility.getTab(usePathname())

    const {
        sender,
        target,
        type,
        createdAt,
        read,
        setRead,
    } = useAction(action, [
        'sender',
        'target',
        'type',
        'createdAt',
        'read',
    ])

    const {
        iHeadshot,
        firstName,
        lastName,
        pseudonym,
    } = useAuthor(sender.author, [
        'iHeadshot->90',
        'firstName',
        'lastName',
        'pseudonym',
    ])

    const {
        representative,
        title,
    } = useBook(target.book, [
        'representative',
        'title',
    ])

    const {
        iPrograph,
    } = useScrap(representative, [
        'iPrograph->90',
    ])

    let text = ''
    if (type === 'sendRequest') text = 'sent you a friend request! '
    else if (type === 'acceptRequest') text = 'accepted your friend request! '
    else if (type === 'likeBook') text = 'liked '
    else if (type === 'postBook') text = 'posted '

    const handleRead = async () => {
        if (read) return
        const response = await utility.edit('Action', action, 'read', true)
        if (response.success) {
            cache.filter([action, 'read'])
            cache.filter([user, 'actions'])
            setRead(true)
        }
    }

    return (
        <GestureHandlerRootView>
            <View center style={{
                width: dimensions.width,
                height: 64,
                borderBottomWidth: 1,
                borderBottomColor: palette.color2,
            }}>
                <Drawer
                    itemsTextStyle={{
                        color: palette.color5,
                        fontFamily: fonts.playBold,
                    }}
                    rightItems={[
                        {
                            text: 'Remove',
                            background: palette.color1,
                            onPress: () => handleRemove(action),
                        }
                    ]}
                    leftItem={{
                        text: `${utility.getDate(createdAt)}`,
                        background: palette.color1,
                    }}
                >
                    <TouchableOpacity center row onPress={() => {
                        router.navigate(`${tab}/author/${sender.author}`)
                        handleRead()
                    }} style={{
                        width: dimensions.width,
                        opacity: read ? 0.5 : 1,
                    }}>
                        <Image source={iHeadshot} style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                        }} />
                        <Text style={{
                            fontFamily: fonts.jockeyOne,
                            fontSize: 16,
                            color: palette.color6,
                        }}> {utility.formatName(firstName, lastName, pseudonym)} </Text>

                        <Text style={{
                            fontFamily: fonts.itim,
                            fontSize: 16,
                            color: palette.color6,
                        }}>{text}</Text>

                        {['likeBook', 'postBook'].includes(type) && (
                            <TouchableOpacity center row onPress={() => {
                                router.navigate(`/${tab}/book/${target.book}`)
                                handleRead()
                            }}>
                                <Image source={iPrograph} style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 2,
                                }} />

                                <Text style={{
                                    fontFamily: fonts.itim,
                                    fontSize: 16,
                                    color: palette.color6,
                                }}> {title.length > 15 ? `${title.slice(0, 15)}...` : title}</Text>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                </Drawer>
            </View>
        </GestureHandlerRootView>
    )
}

export default Component