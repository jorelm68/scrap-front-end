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
import AuthorSmall from './AuthorSmall'
import ScrapCarousel from './ScrapCarousel'
import Map from './Map'

const Component = ({ book, page = 0, scraps: scrapsGiven }) => {
    const navigation = useNavigation()
    const { palette, user, currentScrap } = useContext(AppContext)
    const tab = utility.getTab(usePathname())
    const [hidden, setHidden] = useState(true)

    const {
        scraps,
        author,
        isPublic,
        title,
        description,
        miles: bookMiles,
        likes,
        beginDate,
        endDate,
        toggleLike,
    } = useBook(book === 'scrapbook' ? undefined : book, [
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
        miles: authorMiles,
    } = useAuthor(book === 'scrapbook' ? user : author, [
        'firstName',
        'lastName',
        'pseudonym',
        'relationship',
        'miles',
    ])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: book === 'scrapbook' ? 'Scrapbook' : title,
            headerBackTitleVisible: false,
            headerRight: book !== 'scrapbook' && (user === author) ? () => (
                <TouchableOpacity onPress={async () => {
                    router.navigate({
                        pathname: `/${tab}/book/editBook`,
                        params: {
                            book,
                        }
                    })
                }}>
                    <Ionicons name='pencil' color={palette.color6} size={24} />
                </TouchableOpacity>
            ) : () => { },
        })
    }, [useNavigation, title, user, author])

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
                }}>This book is private and you aren't friends with {utility.formatName(firstName, lastName, pseudonym)}</Text>

                <AuthorSmall author={author} />
            </View>
        )
    }
    else {
        return (
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} >
                <Map
                    scraps={book === 'scrapbook' ? scrapsGiven : scraps}
                    scrap={currentScrap}
                />

                {book !== 'scrapbook' && (
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
                                }}>From {utility.getDate(beginDate)} to {utility.getDate(endDate)}</Text>
                            </View>
                        )}

                        <View row center style={{
                            position: 'absolute',
                            right: 0,
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    router.navigate({
                                        pathname: `/${tab}/book/likes`,
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
                                    router.navigate({
                                        pathname: `/${tab}/book/likes`,
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
                )}

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
                        }}>{Math.round(book === 'scrapbook' ? authorMiles : bookMiles)} Mile{Math.round(book === 'scrapbook' ? authorMiles : bookMiles) === 1 ? '' : 's'} Traveled</Text>
                    </View>

                </View>

                {book !== 'scrapbook' && (
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
                )}

                <ScrapCarousel scraps={book === 'scrapbook' ? scrapsGiven : scraps} initialPage={page} />
                <View height={200} />
            </ScrollView>
        )
    }
}

export default Component