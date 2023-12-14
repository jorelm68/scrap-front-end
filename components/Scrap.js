import { View, Text, Image } from 'react-native-ui-lib'
import React, { useContext } from 'react'
import useScrap from '../hooks/useScrap'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import { Ionicons } from '@expo/vector-icons'
import { colors, styles, dimensions } from '../data/styles'

const Scrap = ({ scrap }) => {
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
            width: '100%',
            height: '100%',
        }}>
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
                }}>{firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>
            </View>

            {title && (
                <View>
                    <Text style={{
                        fontFamily: styles.text1,
                        fontSize: 18,
                        paddingBottom: 4,
                    }}>{title}</Text>
                </View>
            )}

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
                        <Ionicons name='globe-outline' color={colors.default} size={18} />
                        <Text style={{
                            fontFamily: styles.text1,
                            fontSize: 12,
                            paddingLeft: 2,
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
                                fontFamily: styles.text1,
                                fontSize: 12,
                                paddingRight: 2,
                            }}>{createdAt}</Text>
                            <Ionicons name='timer-outline' color={colors.default} size={18} />
                        </View>

                    </View>
                </View>
            </View>

            {description && (
                <View style={{
                    borderBottomWidth: 1,
                }}>
                    <Text style={{
                        fontFamily: styles.text1,
                        fontSize: 16,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                    }}>{description}</Text>
                </View>
            )}
        </View>
    )
}

export default Scrap