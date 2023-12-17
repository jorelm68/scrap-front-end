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
import { colors, styles, dimensions } from '../data/styles'

const Book = ({ book, page = 0, scraps: scrapsGiven }) => {
    const router = useRouter()
    const navigation = useNavigation()
    const [initialPage, setInitialPage] = useState(page)
    const { currentScrap } = useContext(AppContext)

    const {
        title,
        description,
        representative,
        privacy,
        scraps,
        author,
    } = useBook(book, [
        'title',
        'description',
        'representative',
        'scraps',
        'privacy',
        'author',
    ])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: book ? title : 'Scrapbook',
            headerBackTitleVisible: false,
            headerRight: book ? () => (
                <TouchableOpacity onPress={async () => {
                    router.push({
                        pathname: '/editBook', params: {
                            book,
                        }
                    })
                }}>
                    <Ionicons name='pencil' color={colors.default} size={32} />
                </TouchableOpacity>
            ) : () => { },
        })
    }, [navigation, title])

    const clickMarker = async (marker) => {
        console.log(marker)
    }

    return (
        <View>
            <ScrollView style={{
                width: '100%',
                height: '100%',
            }}>
                <MapComponent
                    scraps={book ? scraps : scrapsGiven}
                    scrap={currentScrap}
                    clickMarker={clickMarker}
                />
                <ScrapCarousel scraps={book ? scraps : scrapsGiven} initialPage={initialPage} width='100%' />
            </ScrollView>
        </View>
    )
}

export default Book