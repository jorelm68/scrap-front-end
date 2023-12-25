import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Drawer, TouchableOpacity } from 'react-native-ui-lib'
import AppContext from '../context/AppContext'
import { Alert, FlatList } from 'react-native'
import api from '../data/api'
import utility from '../data/utility'
import { useRouter } from 'expo-router'
import { dimensions, fonts } from '../data/styles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Screen = () => {
    const router = useRouter()
    const { user, setUser, paused, setPaused, palette } = useContext(AppContext)
    const [accounts, setAccounts] = useState([])
    useEffect(() => {
        utility.retrieveData('accounts').then((accounts) => {
            setAccounts(JSON.parse(accounts))
        }).catch(() => { })
    }, [])

    // Display some error text when the user hasn't signed in before
    if (accounts.length === 0) {
        return (
            <View center style={{
                padding: 4,
            }}>
                <Text style={{
                    fontFamily: fonts.itim,
                    fontSize: 16,
                    color: palette.color6,
                }}>You must have signed into an account in the past in order for it to appear here</Text>
            </View>
        )
    }

    // This is the callback function for displaying each individual drawer in the FlatList
    const renderItem = ({ item: account }) => {
        return (
            <GestureHandlerRootView>
                <Drawer
                    itemsTextStyle={{
                        color: palette.color5,
                        fontFamily: fonts.playBold,
                    }}
                    rightItems={[
                        {
                            text: 'Sign In',
                            background: palette.color3,
                            onPress: async () => {
                                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                                setPaused(true)
                                // First, make sure the author exists on the back end
                                const response = await api.author.exists(account.author)
                                // If there is some sort of error, forget the account
                                if (response.error) {
                                    setPaused(false)
                                    Alert.alert('Error', 'Error signing into your account. Please try manually')
                                    await utility.forgetAccount(account)
                                    setAccounts(accounts.filter(storedAccounts => storedAccounts.author !== account.author))
                                }
                                else if (!response.data.exists) {
                                    setPaused(false)
                                    Alert.alert('Error', 'Error signing into your account. Please try manually')
                                    await utility.forgetAccount(account)
                                    setAccounts(accounts.filter(storedAccounts => storedAccounts.author !== account.author))
                                }
                                else {
                                    // Set the account to expire one week from now
                                    const updatedAccount = {
                                        author: account.author,
                                        pseudonym: account.pseudonym,
                                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                                    }

                                    await utility.forgetAccount(account)
                                    await utility.saveAccount(updatedAccount)

                                    await utility.storeData('autothenticate', account.author)
                                    setUser(account.author)
                                    const yes = await utility.hasOfflineScraps()
                                    if (yes) {
                                        const response1 = await utility.onlineSaveScraps(account.author)
                                        if (response1.success) {
                                            console.log('successfully saved scraps')
                                        }
                                    }

                                    router.replace('/(tabs)/camera')
                                    setPaused(false)
                                }
                            },
                        },
                        {
                            text: 'Forget',
                            background: palette.color4,
                            onPress: async () => {
                                // First, change the accounts on the device itself
                                await utility.forgetAccount(account)

                                // Then, change the accounts variable locally so that it disappears from the screen
                                setAccounts(accounts.filter(storedAccount => storedAccount.author !== account.author))
                            },
                        },
                    ]}
                    leftItem={{
                        text: `Expires ${utility.getDate(account.expires)}`,
                        background: palette.color4,
                    }}
                >
                    <View center padding-s4 bg-white style={{
                        height: 60,
                        borderBottomWidth: 1,
                        borderBottomColor: palette.color5,
                        backgroundColor: palette.color1,
                    }}>
                        <Text style={{
                            fontFamily: fonts.jockeyOne,
                            fontSize: 18,
                            color: palette.color5,
                        }}>{account.pseudonym}</Text>
                    </View>
                </Drawer>
            </GestureHandlerRootView>
        )
    }

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: palette.color1,
        }}>
            <FlatList
                data={accounts}
                renderItem={renderItem}
                keyExtractor={item => item.author}
            />
        </View>
    )
}

export default Screen