const moment = require('moment-timezone')
import * as Font from 'expo-font'
import { Alert } from 'react-native'
import * as Location from 'expo-location'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import * as SecureStore from 'expo-secure-store'
import Cache from '../data/cache'

export async function storeData(key, value) {
    try {
        await SecureStore.setItemAsync(key, value)
    } catch (error) {
        console.log('error storing: ', error.message)
    }
}

export async function saveAccount(account) {
    try {
        const data = await retrieveData('accounts')
        const accounts = JSON.parse(data)
        for (const storedAccount of accounts) {
            if (storedAccount.author === account.author) {
                return
            }
        }

        await storeData('accounts', JSON.stringify([account, ...accounts]))
    } catch (error) {
        console.log('Error while adding account: ', error)
    }
}
export async function forgetAccount(account) {
    try {
        const data = await retrieveData('accounts')
        const accounts = JSON.parse(data)
        const updatedAccounts = accounts.filter(storedAccount => storedAccount.author !== account.author)
        await storeData('accounts', JSON.stringify(updatedAccounts))
    } catch (error) {
        console.error('Error while forgetting account: ', error)
    }
}


export async function retrieveData(key) {
    try {
        const value = await SecureStore.getItemAsync(key)
        if (value !== null) {
            return value
        }
        else {
            return null
        }
    } catch (error) {
        console.log('error retrieving: ', error.message)
        return null
    }
}

export async function deleteData(key) {
    try {
        await SecureStore.deleteItemAsync(key)
    }
    catch (error) {
        console.log('error deleting: ', error.message)
    }
}

export async function registerForPushNotifications() {
    let token

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        })
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!')
            return
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
    } else {
        alert('Must use physical device for Push Notifications')
    }

    return token
}

export async function loadFonts() {
    try {
        await Font.loadAsync({
            'Itim': require('../assets/fonts/Itim-Regular.ttf'),
            'Jockey One': require('../assets/fonts/JockeyOne-Regular.ttf'),
        })
    } catch (error) {
        throw new Error('Error in loadFonts: ' + error.message)
    }
}
