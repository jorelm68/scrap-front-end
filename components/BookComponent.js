import { View, Text, Image, Colors } from 'react-native-ui-lib'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useBook from '../hooks/useBook'
import { dimensions, palette, fonts } from '../data/styles'
import useAuthor from '../hooks/useAuthor'
import MapView from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import useScrap from '../hooks/useScrap'
import { useRouter } from 'expo-router'

const BookComponent = ({ book, showAuthor, clickable }) => {
    const router = useRouter()
    const [hidden, setHidden] = useState(true)
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
        relationship,
    } = useAuthor(author, [
        'relationship',
    ])

    const {
        iPrograph,
        place,
    } = useScrap(representative, [
        'iPrograph->1080',
        'place',
    ])

    const {
        iPrograph: blurry,
    } = useScrap(representative, [
        'iPrograph->10',
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

    useEffect(() => {
        if (isPublic) {
            setHidden(false)
        }
        else {
            if (['friend', 'self'].includes(relationship)) {
                setHidden(false)
            }
        }
    }, [isPublic, relationship])

    return (
        <View style={{
            marginBottom: 4,
            paddingHorizontal: 4,
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
                        width: (dimensions.width - 8),
                        height: (dimensions.width - 8) / 4,
                    }}>
                        <Image source={hidden ? blurry : iPrograph} style={{
                            width: (dimensions.width - 8) / 4,
                            height: (dimensions.width - 8) / 4,
                            borderRadius: 8,
                        }} />

                        <View style={{
                            width: (dimensions.width - 8) / 2,
                            height: (dimensions.width - 8) / 4,
                        }}>
                            {showAuthor && (
                                <TouchableOpacity centerV row onPress={() => {
                                    router.push({
                                        pathname: '/profile',
                                        params: {
                                            author,
                                        }
                                    })
                                }}>
                                    <View centerV row style={{
                                        width: (dimensions.width - 8) / 2,
                                        height: (dimensions.width - 8) / 4 * (1 / 4),
                                        paddingLeft: 2,
                                    }}>
                                        <Image source={iHeadshot} style={{
                                            width: (dimensions.width - 8) / 4 * (1 / 4),
                                            height: (dimensions.width - 8) / 4 * (1 / 4),
                                            borderRadius: 12,
                                        }} />
                                        <Text style={{
                                            fontFamily: fonts.jockeyOne,
                                            fontSize: 16,
                                            paddingLeft: 2,
                                            color: palette.secondary14,
                                        }}>{firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            {!hidden && (
                                <View style={{
                                    width: (dimensions.width - 8) / 2,
                                    height: (dimensions.width - 8) / 4 * (1 / 4)
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.itim,
                                        fontSize: 18,
                                        color: palette.secondary14,
                                        paddingHorizontal: 2,
                                    }}>{title.length <= 20 ? title : `${title.slice(0, 20)}...`}</Text>
                                </View>
                            )}

                            <View style={{
                                width: (dimensions.width - 8) / 2,
                                height: (dimensions.width - 8) / 4 * (1 / 2)
                            }}>
                                <Text style={{
                                    height: 48,
                                    paddingHorizontal: 2,
                                    fontFamily: fonts.itim,
                                    fontSize: 12,
                                    color: palette.secondary14,
                                }}>{hidden ? `Become friends with ${firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`} to view this book!` : description.length <= 100 ? description : `${description.slice(0, 100)}...`}</Text>
                            </View>
                        </View>

                        {!hidden && (
                            <View center style={{
                                width: (dimensions.width - 8) / 4,
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
                        )}
                        {hidden && (
                            <View center style={{
                                width: (dimensions.width - 8) / 4,
                                height: dimensions.width / 4,
                            }}>
                                <Ionicons name='finger-print' color={palette.secondary14} size={24} />
                                <Text style={{
                                    fontFamily: fonts.itim,
                                    fontSize: 12,
                                    lineHeight: 14,
                                    textAlign: 'center',
                                    color: palette.secondary14,
                                }}>Private</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            )}

            {!clickable && (
                <View row style={{
                    width: (dimensions.width - 8),
                    height: (dimensions.width - 8) / 4,
                }}>
                    <Image source={hidden ? blurry : iPrograph} style={{
                        width: (dimensions.width - 8) / 4,
                        height: (dimensions.width - 8) / 4,
                        borderRadius: 8,
                    }} />

                    <View style={{
                        width: (dimensions.width - 8) / 2,
                        height: (dimensions.width - 8) / 4,
                    }}>
                        {showAuthor && (
                            <View centerV row style={{
                                width: (dimensions.width - 8) / 2,
                                height: (dimensions.width - 8) / 4 * (1 / 4),
                                paddingLeft: 2,
                            }}>
                                <Image source={iHeadshot} style={{
                                    width: (dimensions.width - 8) / 4 * (1 / 4),
                                    height: (dimensions.width - 8) / 4 * (1 / 4),
                                    borderRadius: 12,
                                }} />
                                <Text style={{
                                    fontFamily: fonts.jockeyOne,
                                    fontSize: 12,
                                    paddingLeft: 2,
                                    color: palette.secondary14,
                                }}>{firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>
                            </View>
                        )}

                        {!hidden && (
                            <View style={{
                                width: (dimensions.width - 8) / 2,
                                height: (dimensions.width - 8) / 4 * (1 / 4)
                            }}>
                                <Text style={{
                                    fontFamily: fonts.itim,
                                    fontSize: 18,
                                    color: palette.secondary14,
                                    paddingHorizontal: 2,
                                }}>{title.length <= 20 ? title : `${title.slice(0, 20)}...`}</Text>
                            </View>
                        )}

                        <View style={{
                            width: (dimensions.width - 8) / 2,
                            height: (dimensions.width - 8) / 4 * (1 / 2)
                        }}>
                            <Text style={{
                                height: 48,
                                paddingHorizontal: 2,
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                color: palette.secondary14,
                            }}>{hidden ? `Become friends with ${firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`} to view this book!` : description.length <= 100 ? description : `${description.slice(0, 100)}...`}</Text>
                        </View>
                    </View>

                    {!hidden && (
                        <View center style={{
                            width: (dimensions.width - 8) / 4,
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
                    )}
                    {hidden && (
                        <View center style={{
                            width: (dimensions.width - 8) / 4,
                            height: dimensions.width / 4,
                        }}>
                            <Ionicons name='finger-print' color={palette.secondary14} size={24} />
                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                lineHeight: 14,
                                textAlign: 'center',
                                color: palette.secondary14,
                            }}>Private</Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    )
}

export default BookComponent