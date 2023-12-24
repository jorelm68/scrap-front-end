import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { View, Text, Image, TouchableOpacity  } from 'react-native-ui-lib'
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

const Page = ({ book, page = 0, scraps: scrapsGiven }) => {
    const navigation = useNavigation()
    const { palette, user, currentScrap } = useContext(AppContext)
    const [hidden, setHidden] = useState(true)

    const {
        scraps,
        author,
        isPublic,
        title,
        description,
        miles,
        likes,
        beginDate,
        endDate,
        toggleLike,
    } = useBook(book, [
        'scraps',
        'author',
        'isPublic',
        'title',
        'description',
        'miles',
        'likes',
        'beginDate',
        'endDate',
    ])

    const {
        firstName,
        lastName,
        pseudonym,
        relationship,
    } = useAuthor(author, [
        'firstName',
        'lastName',
        'pseudonym',
        'relationship',
    ])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: book ? title : 'Scrapbook',
            headerBackTitleVisible: false,
            headerRight: book && (user === author) ? () => (
                <TouchableOpacity onPress={async () => {
                    navigation.navigate({
                        pathname: '/editBook', params: {
                            book,
                        }
                    })
                }}>
                    <Ionicons name='pencil' color={palette.color6} size={24} />
                </TouchableOpacity>
            ) : () => { },
        })
    }, [navigation, title, user, author])

    useEffect(() => {
        if (scrapsGiven) {
            setHidden(false)
        }
        else if (isPublic) {
            setHidden(false)
        }
        else {
            if (['friend', 'self'].includes(relationship)) {
                setHidden(false)
            }
        }
    }, [relationship, isPublic])

    if (hidden) {
        return (
            <View>
                <Text style={{
                    marginVertical: 16,
                    fontFamily: fonts.itim,
                    fontSize: 16,
                    color: palette.color5,
                    textAlign: 'center',
                }}>This book is private and you aren't friends with {firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>

                <AuthorComponent author={author} />
            </View>
        )
    }
    else {
        return (
            <ScrollView showsVerticalScrollIndicator={false}  keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} >
                <MapComponent
                    scraps={book ? scraps : scrapsGiven}
                    scrap={currentScrap}
                />
                <View centerV style={{
                    width: dimensions.width,
                    height: 24,
                }}>
                    {beginDate && endDate && (
                        <View row center style={{
                            position: 'absolute',
                            left: 4,
                        }}>
                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                color: palette.color6,
                            }}>{getDateRange(beginDate, endDate)} </Text>
                        </View>
                    )}

                    <View row center style={{
                        position: 'absolute',
                        right: 0,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate({
                                    pathname: '/likes',
                                    params: {
                                        book,
                                    }
                                })
                            }}
                        >
                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                color: palette.color6,
                            }}>{likes.length} Like{likes.length === 1 ? '' : 's'} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={user !== author ? toggleLike : () => {
                                navigation.navigate({
                                    pathname: '/likes',
                                    params: {
                                        book,
                                    }
                                })
                            }}
                        >
                            <Ionicons name={user === author ? 'heart-circle' : likes.includes(user) ? 'heart' : 'heart-outline'} color={likes.includes(user) ? 'red' : palette.color6} size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View center style={{
                    position: 'absolute',
                    width: dimensions.width,
                }}>
                    <View center style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: 8,
                        paddingHorizontal: 4,
                    }}>
                        <Text style={{
                            padding: 4,
                            paddingBottom: 0,
                            fontFamily: fonts.itim,
                            fontSize: 24,
                            color: '#CCCCCC',
                            lineHeight: 24,
                        }}>{Math.round(miles)} Mile{Math.round(miles) === 1 ? '' : 's'} Traveled</Text>
                    </View>

                </View>
                <View style={{
                    borderBottomWidth: 2,
                    borderBottomColor: palette.color5,
                }}>
                    <Text style={{
                        padding: 4,
                        fontFamily: fonts.itim,
                        fontSize: 12,
                        color: palette.color5,
                    }}>{description}</Text>
                </View>

                <ScrapCarousel scraps={book ? scraps : scrapsGiven} initialPage={page} />
                <View height={120} />
            </ScrollView>
        )
    }
}

export default Page