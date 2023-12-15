import { View, Text } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import ScrapCarousel from '../components/ScrapCarousel'
import MapComponent from '../components/MapComponent'
import AppContext from '../context/AppContext'

const Book = () => {
    const navigation = useNavigation()
    const [initialPage, setInitialPage] = useState(0)
    const { currentScrap } = useContext(AppContext)
    const params = useLocalSearchParams()
    const book = params.book

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
            headerTitle: title,
            headerBackTitleVisible: false,
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
                    scraps={scraps}
                    scrap={currentScrap}
                    clickMarker={clickMarker}
                />
                <ScrapCarousel scraps={scraps} initialPage={initialPage} width='100%' />
            </ScrollView>
        </View>
    )
}

export default Book