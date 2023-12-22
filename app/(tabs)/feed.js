import { View, Text, Button, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useRouter } from 'expo-router'
import { deleteData } from '../../data/utility'
import { dimensions, palette } from '../../data/styles'
import { utilityFeed } from '../../data/api'
import AppContext from '../../context/AppContext'
import BookComponent from '../../components/BookComponent'
import useAuthor from '../../hooks/useAuthor'

const Feed = () => {
    const { user } = useContext(AppContext)

    const {
        feed,
    } = useAuthor(user, [
        'feed',
    ])

    console.log(feed)
    return (
        <View style={{
            paddingTop: 4,
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.primary1,
        }}>
            {feed && feed.map((book) => {
                return (
                    <BookComponent book={book} clickable key={book} showAuthor />
                )
            })}
        </View>
    )
}

export default Feed