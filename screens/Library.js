import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import { Ionicons } from '@expo/vector-icons'
import { dimensions, fonts } from '../data/styles'
import { usePathname, router } from 'expo-router'
import api from '../data/api'
import cache from '../data/cache'
import utility from '../data/utility'

const Screen = () => {
    const { user, setFunctions, paused, setPaused, palette } = useContext(AppContext)
    const tab = utility.getTab(usePathname())
    const {
        scraps,
        setScraps,
        books,
        setBooks,
    } = useAuthor(user, [
        'scraps',
        'books',
    ])

    useEffect(() => {
        setFunctions((prevFunctions) => ({
            ...prevFunctions,
            deleteScraps: async (selection) => {
                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                setPaused(true)
                router.navigate('loading')
                const response = await api.scrap.deleteScraps(selection)
                if (response.success) {
                    cache.filter([user, 'miles'])
                    cache.filter([user, 'books'])
                    cache.filter([user, 'profileBooks'])
                    cache.filter([user, 'publicBooks'])
                    cache.filter([user, 'unbookedScraps'])
                    cache.filter(['scraps'])
                    setScraps((prevScraps) => [
                        ...prevScraps.filter((scrap) => {
                            return !selection.includes(scrap)
                        })
                    ])

                    for (const scrap of selection) {
                        cache.filter([scrap])
                    }
                }
                router.back()
                setPaused(false)
            },
            deleteBooks: async (selection) => {
                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                setPaused(true)
                router.navigate('loading')
                const response = await api.book.deleteBooks(selection)
                if (response.success) {
                    cache.filter([user, 'profileBooks'])
                    cache.filter([user, 'publicBooks'])
                    cache.filter(['book'])
                    setBooks((prevBooks) => [
                        ...prevBooks.filter((book) => {
                            return !selection.includes(book)
                        })
                    ])

                    for (const book of books) {
                        cache.filter([book])
                    }
                }
                router.back()
                setPaused(false)
            }
        }))
    }, [])

    const handleScraps = async () => {
        cache.filter([user, 'scraps'])
        router.navigate({
            pathname: `/${tab}/book/scraps`,
            params: {
                scraps: JSON.stringify(scraps),
            }
        })
    }
    const handleBooks = async () => {
        cache.filter([user, 'books'])
        router.navigate({
            pathname: `/${tab}/book/books`,
            params: {
                books: JSON.stringify(books),
            }
        })
    }
    const handleCreateBook = async () => {
        router.navigate(`/${tab}/book/createBook`)
    }

    const handleDeleteBooks = async () => {
        router.navigate({
            pathname: `/library/chooseBooks`,
            params: {
                books: JSON.stringify(books),
                amount: JSON.stringify(books.length),
                functionName: 'deleteBooks',
            }
        })
    }

    const handleCreateScrap = async () => {
        router.replace('/camera')
    }

    const handleDeleteScraps = async () => {
        router.navigate({
            pathname: `/library/chooseScraps`,
            params: {
                scraps: JSON.stringify(scraps),
                amount: JSON.stringify(scraps.length),
                functionName: 'deleteScraps',
            }
        })
    }

    return (
        <View style={{
            backgroundColor: palette.color1,
        }}>
            <View style={{
                height: '5%',
            }} />
            <View row center style={{
                height: '45%',
            }}>
                <TouchableOpacity center onPress={handleBooks}>
                    <Ionicons name='library-outline' size={dimensions.width / 6} color={palette.color6} />
                    <Text style={{
                        fontFamily: fonts.playBold,
                        fontSize: 24,
                        color: palette.color6,
                    }}>Books</Text>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity row center onPress={handleCreateBook} style={{
                        marginHorizontal: 16,
                    }}>
                        <Ionicons name='add' size={24} color={palette.color6} />
                        <Text style={{
                            fontSize: 18,
                            fontFamily: fonts.jockeyOne,
                            color: palette.color6,
                        }}> Create</Text>
                    </TouchableOpacity>
                    <View style={{
                        height: '15%',
                    }} />
                    <TouchableOpacity row center onPress={handleDeleteBooks}>
                        <Ionicons name='remove' size={24} color={palette.color6} />
                        <Text style={{
                            fontSize: 18,
                            fontFamily: fonts.jockeyOne,
                            color: palette.color6,
                        }}> Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View row center style={{
                height: '45%',
            }}>
                <TouchableOpacity center onPress={handleScraps} style={{
                    marginHorizontal: 16,
                }}>
                    <Ionicons name='image-outline' size={dimensions.width / 6} color={palette.color6} />
                    <Text style={{
                        fontFamily: fonts.playBold,
                        fontSize: 24,
                        color: palette.color6,
                    }}>Scraps</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity row center onPress={handleCreateScrap}>
                        <Ionicons name='add' size={24} color={palette.color6} />
                        <Text style={{
                            fontSize: 18,
                            fontFamily: fonts.jockeyOne,
                            color: palette.color6,
                        }}> Create</Text>
                    </TouchableOpacity>
                    <View style={{
                        height: '15%',
                    }} />
                    <TouchableOpacity row center onPress={handleDeleteScraps}>
                        <Ionicons name='remove' size={24} color={palette.color6} />
                        <Text style={{
                            fontSize: 18,
                            fontFamily: fonts.jockeyOne,
                            color: palette.color6,
                        }}> Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                height: '5%',
            }} />
        </View>
    )
}

export default Screen