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
    } = useBook(book, [
        'scraps',
        'author',
        'isPublic',
        'title',
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
                    <Ionicons name='pencil' color={palette.complement4} size={24} />
                </TouchableOpacity>
            ) : () => { },
        })
    }, [navigation, title, user, author])

    useEffect(() => {
        if (isPublic) {
            setHidden(false)
        }
        else {
            if (relationship === 'friend') {
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
                    color: palette.secondary14,
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
                    clickMarker={async (marker) => {
                        console.log(marker)
                    }}
                />
                <ScrapCarousel scraps={book ? scraps : scrapsGiven} initialPage={page} />
                <View height={120} />
            </ScrollView>
        )
    }
}

export default Book