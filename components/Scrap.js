import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib'
import { TouchableWithoutFeedback } from 'react-native'
import React, { useContext } from 'react'
import useScrap from '../hooks/useScrap'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import { Ionicons } from '@expo/vector-icons'
import { fonts, dimensions, palette } from '../data/styles'
import { useRouter } from 'expo-router'

const Scrap = ({ scrap }) => {
    const router = useRouter()
    const { user } = useContext(AppContext)
    const {
        iPrograph,
        iRetrograph,
        title,
        description,
        place,
        latitude,
        longitude,
        author,
        toggleDirection,
        createdAt,
    } = useScrap(scrap, [
        'iPrograph->1080',
        'iRetrograph->1080',
        'title',
        'description',
        'place',
        'latitude',
        'longitude',
        'author',
        'createdAt',
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
        }}>
            <TouchableOpacity centerV row style={{
                width: dimensions.width * (2 / 3)
            }} onPress={() => {
                router.push({
                    pathname: '/profile',
                    params: {
                        author,
                    }
                })
            }}>
                <Image source={iHeadshot} style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                }} />
                <View row centerV style={{
                    width: dimensions.width * (2 / 3) - 48
                }}>
                    <Text style={{
                        fontFamily: fonts.jockeyOne,
                        fontSize: 18,
                        paddingLeft: 4,
                        color: palette.secondary14,
                    }}>{firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>

                    {author === user && (
                        <TouchableOpacity style={{
                            position: 'absolute',
                            right: 4,
                        }} onPress={() => {
                            router.push({
                                pathname: '/editScrap',
                                params: {
                                    scrap,
                                }
                            })
                        }}>
                            <Ionicons name='pencil' color={palette.complement4} size={18} />
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
                        paddingHorizontal: 2,
                        width: dimensions.width * (2 / 3),
                        color: palette.secondary14,
                    }}>{title}</Text>
                </View>
            )}

            <TouchableWithoutFeedback onPress={toggleDirection}>
                <View center>
                    <Image source={iPrograph} style={{
                        width: dimensions.width,
                        height: dimensions.width,
                        borderRadius: 8,
                    }} />
                    <Image source={iRetrograph} style={{
                        position: 'absolute',
                        width: dimensions.width / 3,
                        height: dimensions.width / 3,
                        top: -48,
                        right: 0,
                        borderRadius: 8,
                    }} />
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
                        <Ionicons name='globe-outline' color={palette.secondary14} size={18} />
                        <Text style={{
                            fontFamily: fonts.itim,
                            fontSize: 12,
                            paddingLeft: 2,
                            color: palette.secondary14,
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
                                color: palette.secondary14,
                            }}>{createdAt}</Text>
                            <Ionicons name='timer-outline' color={palette.secondary14} size={18} />
                        </View>

                    </View>
                </View>
            </View>

            {description && (
                <View style={{
                }}>
                    <Text style={{
                        fontFamily: fonts.itim,
                        fontSize: 16,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                        color: palette.secondary14,
                    }}>{description}</Text>
                </View>
            )}
        </View>
    )
}

export default Scrap