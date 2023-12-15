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

const BookComponent = ({ book }) => {
    const router = useRouter()
    const {
        author,
        title,
        description,
        scraps,
        isPublic,
        representative,
    } = useBook(book, [
        'author',
        'title',
        'description',
        'scraps',
        'isPublic',
        'representative',
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
        <TouchableWithoutFeedback onPress={() => {
            router.push({
                pathname: '/book',
                params: {
                    book,
                }
            })
        }}>
            <View row style={{
                width: dimensions.width,
                height: dimensions.width / 4,
                borderBottomWidth: 1,
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
                    </TouchableOpacity>

                    <Text style={{
                        fontFamily: styles.text1,
                        fontSize: 18,
                    }}>{title}</Text>
                    <Text style={{
                        fontFamily: styles.text1,
                        fontSize: 12,
                    }}>{description}</Text>
                </View>

                <View center style={{
                    width: dimensions.width / 4,
                    height: dimensions.width / 4,
                }}>
                    <Ionicons name='pin' color='red' size={24} />
                    <Text style={{
                        fontFamily: styles.text1,
                        fontSize: 12,
                        lineHeight: 14,
                        textAlign: 'center',
                        color: 'red',
                    }}>{place}</Text>
                </View>
            </View>

        </TouchableWithoutFeedback>
    )
}

export default BookComponent