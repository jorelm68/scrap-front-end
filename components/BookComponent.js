import { View, Text } from 'react-native-ui-lib'
import React from 'react'
import useBook from '../hooks/useBook'

const BookComponent = ({ book }) => {
    const {
        title,
        description,
        scraps,
        privacy,
    } = useBook(book, [
        'title',
        'description',
        'scraps',
        'privacy',
    ])

    return (
        <View>
            <Text>{scraps}</Text>
        </View>
    )
}

export default BookComponent