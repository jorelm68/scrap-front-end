import { View, Text } from 'react-native-ui-lib'
import React, { useContext } from 'react'
import { dimensions } from '../data/styles'
import AuthorList from '../components/AuthorList'
import { useLocalSearchParams } from 'expo-router'
import useBook from '../hooks/useBook'
import AuthorComponent from '../components/AuthorComponent'
import AppContext from '../context/AppContext'

const Likes = () => {
    const { palette } = useContext(AppContext)
    const params = useLocalSearchParams()
    const book = params.book

    const {
        likes,
    } = useBook(book, [
        'likes',
    ])

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
        }}>
            <AuthorList
                authors={likes}
                renderItem={(author) => {
                    return (
                        <AuthorComponent key={author} author={author} />
                    )
                }}
            />
        </View>
    )
}

export default Likes