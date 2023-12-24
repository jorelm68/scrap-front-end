import { View, Text } from 'react-native-ui-lib'
import React, { useContext } from 'react'
import { dimensions } from '../data/styles'
import AuthorList from '../components/AuthorList'
import { useLocalSearchParams } from 'expo-router'
import useBook from '../hooks/useBook'
import AuthorSmall from '../components/AuthorSmall'
import AppContext from '../context/AppContext'

const Screen = ({ book }) => {
    const { palette } = useContext(AppContext)

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
                        <AuthorSmall key={author} author={author} />
                    )
                }}
            />
        </View>
    )
}

export default Screen