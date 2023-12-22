import { View, Text } from 'react-native-ui-lib'
import { ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import ScrapCarousel from '../components/ScrapCarousel'
import MapComponent from '../components/MapComponent'
import AppContext from '../context/AppContext'
import { Ionicons } from '@expo/vector-icons'
import { fonts, dimensions, palette } from '../data/styles'
import BookComponent from './BookComponent'
import useAuthor from '../hooks/useAuthor'
import AuthorComponent from './AuthorComponent'

const Book = ({ book, page = 0, scraps: scrapsGiven }) => {
    const navigation = useNavigation()
    const router = useRouter()
    const { currentScrap, user } = useContext(AppContext)
    const [hidden, setHidden] = useState(true)

    const {
        scraps,
        author,
        isPublic,
        title,
        description,
        miles,
        likes,
        toggleLike,
    } = useBook(book, [
        'scraps',
        'author',
        'isPublic',
        'title',
        'description',
        'miles',
        'likes',
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
                    router.push({
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
            <ScrollView keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} >
                <MapComponent
                    scraps={book ? scraps : scrapsGiven}
                    scrap={currentScrap}
                />
                <View style={{
                    position: 'absolute',
                    height: 200,
                    width: 48,
                    right: 0,
                }}>
                    <View center style={{
                        width: 48,
                        height: 48,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderBottomLeftRadius: 8,
                        borderTopRightRadius: 8,
                    }}>
                        <TouchableOpacity onPress={user !== author ? toggleLike : () => {
                            router.push({
                                pathname: '/likes',
                                params: {
                                    book,
                                }
                            })
                        }}>
                            <Ionicons name={user === author ? 'heart-circle' : likes.includes(user) ? 'heart' : 'heart-outline'} color={likes.includes(user) ? 'red' : palette.color6} size={36} />
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
                            color: palette.color6,
                            lineHeight: 24,
                        }}>{Math.round(miles)} Miles Traveled</Text>
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

export default Book