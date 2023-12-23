import { View, Text, Button, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useRouter } from 'expo-router'
import { deleteData } from '../../data/utility'
import { dimensions } from '../../data/styles'
import { utilityFeed } from '../../data/api'
import AppContext from '../../context/AppContext'
import BookComponent from '../../components/BookComponent'
import useAuthor from '../../hooks/useAuthor'
import BookList from '../../components/BookList'

const Feed = () => {
    const { user, palette } = useContext(AppContext)

    const {
        feed,
    } = useAuthor(user, [
        'feed',
    ])

    return (
        <View style={{
            paddingTop: 4,
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
        }}>
            <BookList
                books={feed}
                renderItem={(book) => {
                    return (
                        <BookComponent book={book} clickable key={book} showAuthor />
                    )
                }}
            />
        </View>
    )
}

export default Feed