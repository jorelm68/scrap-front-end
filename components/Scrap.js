import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib'
import { TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useState } from 'react'
import useScrap from '../hooks/useScrap'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import { Ionicons } from '@expo/vector-icons'
import { fonts, dimensions, palette } from '../data/styles'
import { useRouter } from 'expo-router'
import { getDate } from '../data/utility'
import BookComponent from './BookComponent'
import useBook from '../hooks/useBook'

const Scrap = ({ scrap }) => {
    const router = useRouter()
    const { user } = useContext(AppContext)
    const {
        iPrograph,
        iRetrograph,
        title,
        description,
        place,
        threads,
        author,
        book,
        toggleDirection,
        createdAt,
    } = useScrap(scrap, [
        'iPrograph->1080',
        'iRetrograph->1080',
        'title',
        'description',
        'place',
        'threads',
        'author',
        'book',
        'createdAt',
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

    const [isLongPressing, setIsLongPressing] = useState(false)

    return (
        <View>
            <TouchableOpacity centerV row style={{
                width: dimensions.width * (2 / 3) - 4,
                padding: 4,
            }} onPress={() => {
                router.push({
                    pathname: '/profile',
                    params: {
                        author,
                    }
                })
            }}>
                <Image source={iHeadshot} style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                }} />
                <View row centerV style={{
                    width: dimensions.width * (2 / 3) - 24,
                }}>
                    <Text style={{
                        fontFamily: fonts.jockeyOne,
                        fontSize: 16,
                        paddingLeft: 4,
                        color: palette.color5,
                    }}>{firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>

                    {author === user && !isLongPressing && (
                        <TouchableOpacity style={{
                            position: 'absolute',
                            right: 8,
                        }} onPress={() => {
                            router.push({
                                pathname: '/editScrap',
                                params: {
                                    scrap,
                                }
                            })
                        }}>
                            <Ionicons name='pencil' color={palette.color6} size={18} />
                        </TouchableOpacity>
                    )}

                </View>

            </TouchableOpacity>

            {title && (
                <View>
                    <Text style={{
                        fontFamily: fonts.itim,
                        fontSize: 18,
                        paddingBottom: 4,
                        paddingHorizontal: 4,
                        width: dimensions.width * (2 / 3),
                        color: palette.color5,
                    }}>{title}</Text>
                </View>
            )}

            <TouchableWithoutFeedback onPress={toggleDirection} onLongPress={() => setIsLongPressing(true)} onPressOut={() => setIsLongPressing(false)}>
                <View center>
                    <Image source={iPrograph} style={{
                        width: dimensions.width,
                        height: dimensions.width,
                        borderRadius: isLongPressing ? 0 : 8,

                    }} />
                    {!isLongPressing && (
                        <Image source={iRetrograph} style={{
                            position: 'absolute',
                            width: dimensions.width / 3,
                            height: dimensions.width / 3,
                            top: -48,
                            right: 0,
                            borderRadius: 8,
                        }} />
                    )}
                </View>
            </TouchableWithoutFeedback>

            <View centerV style={{
                width: dimensions.width,
                height: 24,
            }}>
                <View row style={{
                    paddingLeft: 4,
                }}>
                    <View centerV row style={{
                        width: '50%',
                    }}>
                        {place && (
                            <Ionicons name='globe-outline' color={palette.color5} size={18} />
                        )}
                        <Text style={{
                            fontFamily: fonts.itim,
                            fontSize: 12,
                            paddingLeft: 2,
                            color: palette.color5,
                            minHeight: 18,
                        }}>{place}</Text>
                    </View>

                    <View style={{
                        width: '50%',
                    }}>
                        <View centerV row style={{
                            position: 'absolute',
                            right: 4,
                        }}>
                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                paddingRight: 2,
                                color: palette.color5,
                            }}>{getDate(createdAt)}</Text>
                            <Ionicons name='timer-outline' color={palette.color5} size={18} />
                        </View>

                    </View>
                </View>
            </View>

            {description && (
                <View style={{
                }}>
                    <Text style={{
                        fontFamily: fonts.itim,
                        fontSize: 12,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                        color: palette.color5,
                    }}>{description}</Text>
                </View>
            )}

            <View style={{
                paddingTop: 8,
                borderTopColor: palette.color5,
                borderTopWidth: 2,
                flexWrap: 'wrap',
                flexDirection: 'row',
            }}>
                {threads && threads.map((book) => {
                    return (
                        <BookComponent book={book} clickable key={book} showAuthor />
                    )
                })}
            </View>
        </View>
    )
}

export default Scrap