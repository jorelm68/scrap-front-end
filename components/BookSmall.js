import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, usePathname, router } from 'expo-router'
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

const Component = ({ book, clickable }) => {
    const tab = utility.getTab(usePathname())
    const { palette, user } = useContext(AppContext)
    const [hidden, setHidden] = useState(true)
    const {
        author,
        title,
        description,
        isPublic,
        representative,
        scraps,
        // miles,
        likes,
        // beginDate,
        // endDate,
        toggleLike,
    } = useBook(book, [
        'author',
        'title',
        'description',
        'isPublic',
        'representative',
        'scraps',
        // 'miles',
        // 'beginDate',
        // 'endDate',
        'likes',
    ])

    const {
        relationship,
    } = useAuthor(author, [
        'relationship',
    ])

    const {
        iPrograph,
        // place,
    } = useScrap(representative, [
        'iPrograph->270',
        // 'place',
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
        'iHeadshot->90',
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
                    router.push(`/${tab}/book/${book}`)
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
                            width: (dimensions.width - 8) * (3 / 4),
                            height: (dimensions.width - 8) / 4,
                        }}>
                            <TouchableOpacity centerV row onPress={() => {
                                router.push(`/${tab}/author/${author}`)
                            }} style={{
                                marginLeft: -((dimensions.width - 8) / 4 * (1 / 4)) / 2,
                            }}>
                                <View centerV row style={{
                                    width: (dimensions.width - 8) * (3 / 4),
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
                                        color: palette.color5,
                                    }}>{utility.formatName(firstName, lastName, pseudonym)}</Text>
                                </View>
                            </TouchableOpacity>

                            {!hidden && (
                                <View style={{
                                    width: (dimensions.width - 8) * (3 / 4),
                                    height: (dimensions.width - 8) / 4 * (1 / 4)
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.itim,
                                        fontSize: 18,
                                        color: palette.color5,
                                        paddingHorizontal: 2,
                                    }}>{title.length <= 30 ? title : `${title.slice(0, 30)}...`}</Text>
                                </View>
                            )}

                            <View style={{
                                width: (dimensions.width - 8) * (3 / 4),
                                height: (dimensions.width - 8) / 4 * (1 / 2),
                            }}>
                                <Text style={{
                                    height: 48,
                                    paddingHorizontal: 2,
                                    fontFamily: fonts.itim,
                                    fontSize: 12,
                                    color: palette.color5,
                                }}>{hidden ? `Become friends with ${utility.formatName(firstName, lastName, pseudonym)} to view this book!` : description.length <= 100 ? description : `${description.slice(0, 100)}...`}</Text>
                            </View>
                        </View>

                        {/* {!hidden && (
                            <View center style={{
                                width: (dimensions.width - 8) / 4,
                                height: (dimensions.width - 8) / 4,
                                backgroundColor: palette.color2,
                                borderRadius: 8,
                            }}>
                                <TouchableOpacity onPress={() => {
                                    router.navigate({
                                        pathname: `/${tab}/book/likes`,
                                        params: {
                                            book,
                                        }
                                    })
                                }}>
                                    <View center row>
                                        <Text style={{
                                            marginRight: 2,
                                            fontFamily: fonts.itim,
                                            fontSize: 12,
                                            textAlign: 'center',
                                            color: palette.color5,
                                        }}>{likes.length} Like{likes.length === 1 ? '' : 's'}</Text>
                                        <Ionicons name='person' color={palette.color6} size={12} />
                                    </View>
                                </TouchableOpacity>

                                <View center row>
                                    <Text style={{
                                        marginRight: 2,
                                        fontFamily: fonts.itim,
                                        fontSize: 12,
                                        textAlign: 'center',
                                        color: palette.color5,
                                    }}>{scraps.length} Scrap{scraps.length === 1 ? '' : 's'}</Text>
                                    <Ionicons name='image' color={palette.color6} size={12} />
                                </View>

                                <View center row>
                                    <Text style={{
                                        marginRight: 2,
                                        fontFamily: fonts.itim,
                                        fontSize: 12,
                                        textAlign: 'center',
                                        color: palette.color5,
                                    }}>{Math.round(miles)} Mile{Math.round(miles) === 1 ? '' : 's'}</Text>
                                    <Ionicons name='car' color={palette.color6} size={12} />
                                </View>

                                <View center row>
                                    <Text style={{
                                        fontFamily: fonts.itim,
                                        fontSize: 12,
                                        lineHeight: 14,
                                        textAlign: 'center',
                                        color: palette.color5,
                                    }}>{place ? place : 'Somewhere'}</Text>
                                    <Ionicons name='pin' color={palette.color6} size={12} />
                                </View>

                                {beginDate && endDate && (
                                    <View center row>
                                        <Text style={{
                                            fontFamily: fonts.itim,
                                            fontSize: 12,
                                            lineHeight: 14,
                                            textAlign: 'center',
                                            color: palette.color5,
                                        }}>{utility.getDateRange(beginDate, endDate)}</Text>
                                    </View>
                                )}

                            </View>
                        )} */}

                        {!hidden && (
                            <View center row style={{
                                position: 'absolute',
                                right: 4,
                            }}>
                                <TouchableOpacity center onPress={() => {
                                    router.navigate({
                                        pathname: `/${tab}/book/likes`,
                                        params: {
                                            book,
                                        }
                                    })
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.itim,
                                        fontSize: 12,
                                        color: palette.color6,
                                    }}>{likes.length} Like{likes.length === 1 ? '' : 's'} </Text>
                                </TouchableOpacity>

                                <TouchableOpacity center onPress={user !== author ? toggleLike : () => {
                                    router.navigate({
                                        pathname: `/${tab}/book/likes`,
                                        params: {
                                            book,
                                        }
                                    })
                                }}>
                                    <Ionicons name={user === author ? 'heart-circle' : likes.includes(user) ? 'heart' : 'heart-outline'} color={user === author ? palette.color6 : likes.includes(user) ? 'red' : palette.color6} size={24} />
                                </TouchableOpacity>
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
                        width: (dimensions.width - 8) * (3 / 4),
                        height: (dimensions.width - 8) / 4,
                    }}>
                        <View centerV row style={{
                            width: (dimensions.width - 8) * (3 / 4),
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
                                color: palette.color5,
                            }}>{utility.formatName(firstName, lastName, pseudonym)}</Text>
                        </View>

                        {!hidden && (
                            <View style={{
                                width: (dimensions.width - 8) * (3 / 4),
                                height: (dimensions.width - 8) / 4 * (1 / 4)
                            }}>
                                <Text style={{
                                    fontFamily: fonts.itim,
                                    fontSize: 18,
                                    color: palette.color5,
                                    paddingHorizontal: 2,
                                }}>{title.length <= 30 ? title : `${title.slice(0, 30)}...`}</Text>
                            </View>
                        )}

                        <View style={{
                            width: (dimensions.width - 8) * (3 / 4),
                            height: (dimensions.width - 8) / 4 * (1 / 2)
                        }}>
                            <Text style={{
                                height: 48,
                                paddingHorizontal: 2,
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                color: palette.color5,
                            }}>{hidden ? `Become friends with ${utility.formatName(firstName, lastName, pseudonym)} to view this book!` : description.length <= 100 ? description : `${description.slice(0, 100)}...`}</Text>
                        </View>
                    </View>

                    {/* {!hidden && (
                        <View center style={{
                            width: (dimensions.width - 8) / 4,
                            height: (dimensions.width - 8) / 4,
                            backgroundColor: palette.color2,
                            borderRadius: 8,
                        }}>
                            <View center row>
                                <Text style={{
                                    marginRight: 2,
                                    fontFamily: fonts.itim,
                                    fontSize: 12,
                                    textAlign: 'center',
                                    color: palette.color5,
                                }}>{likes.length} Like{likes.length === 1 ? '' : 's'}</Text>
                                <Ionicons name='person' color={palette.color6} size={12} />
                            </View>

                            <View center row>
                                <Text style={{
                                    marginRight: 2,
                                    fontFamily: fonts.itim,
                                    fontSize: 12,
                                    textAlign: 'center',
                                    color: palette.color5,
                                }}>{scraps.length} Scrap{scraps.length === 1 ? '' : 's'}</Text>
                                <Ionicons name='image' color={palette.color6} size={12} />
                            </View>

                            <View center row>
                                <Text style={{
                                    marginRight: 2,
                                    fontFamily: fonts.itim,
                                    fontSize: 12,
                                    textAlign: 'center',
                                    color: palette.color5,
                                }}>{Math.round(miles)} Mile{Math.round(miles) === 1 ? '' : 's'}</Text>
                                <Ionicons name='car' color={palette.color6} size={12} />
                            </View>

                            <View center row>
                                <Text style={{
                                    fontFamily: fonts.itim,
                                    fontSize: 12,
                                    lineHeight: 14,
                                    textAlign: 'center',
                                    color: palette.color5,
                                }}>{place ? place : 'Somwhere'}</Text>
                                <Ionicons name='pin' color={palette.color6} size={12} />
                            </View>

                            {beginDate && endDate && (
                                <View center row>
                                    <Text style={{
                                        fontFamily: fonts.itim,
                                        fontSize: 12,
                                        lineHeight: 14,
                                        textAlign: 'center',
                                        color: palette.color5,
                                    }}>{utility.getDateRange(beginDate, endDate)}</Text>
                                </View>
                            )}

                        </View>
                    )} */}
                </View>
            )}
        </View>
    )
}

export default Component