import { View, Text, Image, Colors } from 'react-native-ui-lib'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import useBook from '../hooks/useBook'
import { colors, dimensions, styles } from '../data/styles'
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
        <View>
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
                                            fontFamily: styles.text2,
                                            fontSize: 18,
                                            paddingLeft: 4,
                                            color: colors.default,
                                        }}>{firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <Text style={{
                                fontFamily: styles.text1,
                                fontSize: 18,
                                color: colors.default,
                            }}>{title}</Text>
                            <Text style={{
                                fontFamily: styles.text1,
                                fontSize: 12,
                                color: colors.default,
                            }}>{description}</Text>
                        </View>

                        <View center style={{
                            width: dimensions.width / 4,
                            height: dimensions.width / 4,
                        }}>
                            <Ionicons name='pin' color={colors.default} size={24} />
                            <Text style={{
                                fontFamily: styles.text1,
                                fontSize: 12,
                                lineHeight: 14,
                                textAlign: 'center',
                                color: colors.default,
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
                                    fontFamily: styles.text2,
                                    fontSize: 18,
                                    paddingLeft: 4,
                                    color: colors.default,
                                }}>{firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>
                            </View>
                        )}

                        <Text style={{
                            fontFamily: styles.text1,
                            fontSize: 18,
                            color: colors.default,
                        }}>{title}</Text>
                        <Text style={{
                            fontFamily: styles.text1,
                            fontSize: 12,
                            color: colors.default,
                        }}>{description}</Text>
                    </View>

                    <View center style={{
                        width: dimensions.width / 4,
                        height: dimensions.width / 4,
                    }}>
                        <Ionicons name='pin' color={colors.default} size={24} />
                        <Text style={{
                            fontFamily: styles.text1,
                            fontSize: 12,
                            lineHeight: 14,
                            textAlign: 'center',
                            color: colors.default,
                        }}>{place}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}

export default BookComponent