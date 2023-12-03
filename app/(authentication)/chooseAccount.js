import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Drawer, Colors, TouchableOpacity } from 'react-native-ui-lib'
import AppContext from '../../context/AppContext'
import { Alert, FlatList } from 'react-native'
import { authorExists } from '../../data/api'
import { forgetAccount, retrieveData, saveAccount, storeData } from '../../data/utility'
import { useRouter } from 'expo-router'

const ChooseAccount = () => {
    const router = useRouter()
    const { setUser } = useContext(AppContext)
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        retrieveData('accounts').then((accounts) => {
            setAccounts(JSON.parse(accounts))
        }).catch(() => { })
    }, [])

    if (accounts.length === 0) {
        return (
            <Text text70>You must have signed into an account in the past in order for it to appear here</Text>
        )
    }

    const handleForget = async (account) => {
        await forgetAccount(account)
        setAccounts(accounts.filter(storedAccount => storedAccount.author !== account.author))
    }

    const signIn = async (account) => {
        const response = await authorExists(account.author)
        if (response.error) {
            Alert.alert('Error', 'Error signing into your account. Please try manually')
            await forgetAccount(account)
        }
        else if (!response.data.exists) {
            Alert.alert('Error', 'Error signing into your account. Please try manually')
            await forgetAccount(account)
        }
        else {
            const updatedAccount = {
                author: account.author,
                pseudonym: account.pseudonym,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }
            await forgetAccount(account)
            await saveAccount(updatedAccount)

            await storeData('autothenticate', account.author)
            setUser(account.author)
            router.replace('/one')
        }
    }

    const renderItem = ({ item }) => {
        return (
            <Drawer
                rightItems={[
                    { text: 'Sign In', background: Colors.green30, onPress: () => signIn(item) },
                    { text: 'Forget', background: Colors.red30, onPress: () => handleForget(item) },
                ]}
                leftItem={{ text: `Expires: ${item.expires}`, background: Colors.black }}
            >
                <View centerV padding-s4 bg-white style={{ height: 60 }}>
                    <Text text70>{item.pseudonym}</Text>
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