import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Drawer, Colors, TouchableOpacity } from 'react-native-ui-lib'
import AppContext from '../../context/AppContext'
import { Alert, FlatList } from 'react-native'
import { authorExists } from '../../data/api'
import { forgetAccount, retrieveData, saveAccount, storeData } from '../../data/utility'
import { useRouter } from 'expo-router'
import { colors, styles } from '../../data/styles'

const ChooseAccount = () => {
    const router = useRouter()
    const { setUser } = useContext(AppContext)
    const [accounts, setAccounts] = useState([])
    useEffect(() => {
        retrieveData('accounts').then((accounts) => {
            setAccounts(JSON.parse(accounts))
        }).catch(() => { })
    }, [])

    // Display some error text when the user hasn't signed in before
    if (accounts.length === 0) {
        return (
            <Text text70>You must have signed into an account in the past in order for it to appear here</Text>
        )
    }

    // Function that handles when the user clicks the Forget button on the drawer
    const handleForget = async (account) => {
        // First, change the accounts on the device itself
        await forgetAccount(account)

        // Then, change the accounts variable locally so that it disappears from the screen
        setAccounts(accounts.filter(storedAccount => storedAccount.author !== account.author))
    }
    // Function that handles when the user clicks the Sign In button on the drawer
    const handleSignIn = async (account) => {
        router.push('/loading')
        // First, make sure the author exists on the back end
        const response = await authorExists(account.author)
        // If there is some sort of error, forget the account
        if (response.error) {
            router.back()
            Alert.alert('Error', 'Error signing into your account. Please try manually')
            await forgetAccount(account)
            setAccounts(accounts.filter(storedAccounts => storedAccounts.author !== account.author))
        }
        else if (!response.data.exists) {
            router.back()
            Alert.alert('Error', 'Error signing into your account. Please try manually')
            await forgetAccount(account)
            setAccounts(accounts.filter(storedAccounts => storedAccounts.author !== account.author))
        }
        else {
            // Set the account to expire one week from now
            const updatedAccount = {
                author: account.author,
                pseudonym: account.pseudonym,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }

            await forgetAccount(account)
            await saveAccount(updatedAccount)

            await storeData('autothenticate', account.author)
            setUser(account.author)
            router.back()
            router.replace('/feed')
        }
    }

    // This is the callback function for displaying each individual drawer in the FlatList
    const renderItem = ({ item }) => {
        return (
            <Drawer
                rightItems={[
                    { text: 'Sign In', background: colors.success, onPress: () => handleSignIn(item) },
                    { text: 'Forget', background: colors.error, onPress: () => handleForget(item) },
                ]}
                leftItem={{ text: `Expires: ${item.expires}`, background: Colors.black }}
            >
                <View center padding-s4 bg-white style={{ height: 60, borderTopWidth: 1 }}>
                    <Text style={{
                        fontFamily: styles.text2,
                        fontSize: 18,
                    }}>{item.pseudonym}</Text>
                </View>
            </Drawer>
        )
    }

    return (
        <View>
            <FlatList
                data={accounts}
                renderItem={renderItem}
                keyExtractor={item => item.author}
            />
        </View>
    )
}

export default ChooseAccount