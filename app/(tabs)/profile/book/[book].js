import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import useBook from '../../../../hooks/useBook'
import useScrap from '../../../../hooks/useScrap'
import ScrapCarousel from '../../../../components/ScrapCarousel'
import AppContext from '../../../../context/AppContext'
import Book from '../../../../components/Book'
import { dimensions } from '../../../../data/styles'
import useAuthor from '../../../../hooks/useAuthor'
import { Ionicons } from '@expo/vector-icons'

const Page = () => {
    const { palette } = useContext(AppContext)
    const params = useLocalSearchParams()
    const book = params.book
    let scraps = []
    let page = 0
    if (params.page) {
        page = JSON.parse(params.page)
    }
    if (book === undefined) {
        scraps = JSON.parse(params.scraps)
    }

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
        }}>
            <Book book={book} scraps={scraps} page={page} />
        </View>
    )
}

export default Page