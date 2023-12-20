import { View, Text, Image, Colors } from 'react-native-ui-lib'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import useBook from '../hooks/useBook'
import { dimensions, palette, fonts } from '../data/styles'
import useAuthor from '../hooks/useAuthor'
import MapView from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import useScrap from '../hooks/useScrap'
import { useRouter } from 'expo-router'

const BookComponent = ({ book, showAuthor, clickable }) => {
    const router = useRouter()
    const {
        author,
        title,
        description,
        isPublic,
        representative,
        scraps,
    } = useBook(book, [
        'author',
        'title',
        'description',
        'isPublic',
        'representative',
        'scraps',
    ])

    const {
        iPrograph,
        place,
    } = useScrap(representative, [
        'iPrograph->1080',
        'place',
    ])

    const {
        iHeadshot,
        firstName,
        lastName,
        pseudonym,
    } = useAuthor(author, [
        'iHeadshot->1080',
        'firstName',
        'lastName',
        'pseudonym',
    ])

    return (
        <View style={{
            marginBottom: 4,
        }}>
            {clickable && (
                <TouchableOpacity onPress={() => {
                    router.push({
                        pathname: '/book',
                        params: {
                            book,
                            page: JSON.stringify(scraps.indexOf(representative))
                        }
                    })
                }}>
                    <View row style={{
                        width: dimensions.width,
                        height: dimensions.width / 4,
                    }}>
                        <Image source={iPrograph} style={{
                            width: dimensions.width / 4,
                            height: dimensions.width / 4,
                            borderRadius: 8,
                        }} />

                        <View style={{
                            width: dimensions.width / 2,
                            padding: 4,
                        }}>
                            <TouchableOpacity centerV row onPress={() => {
                                router.push({
                                    pathname: '/profile',
                                    params: {
                                        author,
                                    }
                                })
                            }}>
                                {showAuthor && (
                                    <View centerV row>
                                        <Image source={iHeadshot} style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 24,
                                        }} />
                                        <Text style={{
                                            fontFamily: fonts.jockeyOne,
                                            fontSize: 18,
                                            paddingLeft: 4,
                                            color: palette.secondary14,
                                        }}>{firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 18,
                                color: palette.secondary14,
                            }}>{title}</Text>
                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                color: palette.secondary14,
                            }}>{description}</Text>
                        </View>

                        <View center style={{
                            width: dimensions.width / 4,
                            height: dimensions.width / 4,
                        }}>
                            <Ionicons name='pin' color={palette.secondary14} size={24} />
                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                lineHeight: 14,
                                textAlign: 'center',
                                color: palette.secondary14,
                            }}>{place}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            {!clickable && (
                <View row style={{
                    width: dimensions.width,
                    height: dimensions.width / 4,
                }}>
                    <Image source={iPrograph} style={{
                        width: dimensions.width / 4,
                        height: dimensions.width / 4,
                        borderRadius: 8,
                    }} />

                    <View style={{
                        width: dimensions.width / 2,
                        padding: 4,
                    }}>
                        {showAuthor && (
                            <View centerV row>
                                <Image source={iHeadshot} style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 24,
                                }} />
                                <Text style={{
                                    fontFamily: fonts.jockeyOne,
                                    fontSize: 18,
                                    paddingLeft: 4,
                                    color: palette.secondary14,
                                }}>{firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>
                            </View>
                        )}

                        <Text style={{
                            fontFamily: fonts.itim,
                            fontSize: 18,
                            color: palette.secondary14,
                        }}>{title}</Text>
                        <Text style={{
                            fontFamily: fonts.itim,
                            fontSize: 12,
                            color: palette.secondary14,
                        }}>{description}</Text>
                    </View>

                    <View center style={{
                        width: dimensions.width / 4,
                        height: dimensions.width / 4,
                    }}>
                        <Ionicons name='pin' color={palette.secondary14} size={24} />
                        <Text style={{
                            fontFamily: fonts.itim,
                            fontSize: 12,
                            lineHeight: 14,
                            textAlign: 'center',
                            color: palette.secondary14,
                        }}>{place}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}

export default BookComponent