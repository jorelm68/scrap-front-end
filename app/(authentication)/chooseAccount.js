import React, { useContext } from 'react'
import { Text, View, Drawer, Colors, TouchableOpacity } from 'react-native-ui-lib'
import AppContext from '../../context/AppContext'
import { Alert, FlatList } from 'react-native'
import { authorExists } from '../../data/api'
import { storeData } from '../../data/utility'
import { useRouter } from 'expo-router'

const ChooseAccount = () => {
    const router = useRouter()
    const { accounts, setAccounts, setUser } = useContext(AppContext)
    console.log(accounts)
    if (accounts.length == 0) {
        return (
            <Text text70>You must have signed into an account in the past in order for it to appear here</Text>
        )
    }

    const handleForget = async (account) => {
        const filteredAccounts = accounts.filter(value => value.pseudonym !== account.pseudonym)
        await storeData('accounts', JSON.stringify(filteredAccounts))
        setAccounts(filteredAccounts)
    }

    const signIn = async (account) => {
        const response = await authorExists(account.author)
        if (response.error) {
            Alert.alert('Error', 'Error signing into your account. Please try manually')
            await handleForget(account)
        }
        else if (!response.data.exists) {
            Alert.alert('Error', 'Error signing into your account. Please try manually')
            await handleForget(account)
        }
        else {
            const updatedAccount = {
                author: account.author,
                pseudonym: account.pseudonym,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }
            await handleForget(account)
            await storeAccount(updatedAccount)

            await storeData('autothenticate', account.author)
            setUser(account.author)
            router.replace('/one')
        }
    }

    const storeAccount = async (account) => {
        const filteredAccounts = [...(accounts.filter(value => value.author !== account.author)), account]
        await storeData('accounts', JSON.stringify(filteredAccounts))
        setAccounts(filteredAccounts)
    }

    const renderItem = ({ index, item }) => {
        return (
            <TouchableOpacity onPress={() => signIn(item)}>
                <Drawer
                    rightItems={[
                        { text: 'Forget', background: Colors.red30, onPress: () => handleForget(item) },
                    ]}
                    leftItem={{ text: `Expires: ${item.expires}`, background: Colors.black }}
                >
                    <View centerV padding-s4 bg-white style={{ height: 60 }}>
                        <Text text70>{item.pseudonym}</Text>
                    </View>
                </Drawer>
            </TouchableOpacity>
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