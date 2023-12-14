const moment = require('moment-timezone')
import * as Font from 'expo-font'
import { Alert } from 'react-native'
import * as Location from 'expo-location'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import * as SecureStore from 'expo-secure-store'
import Cache from '../data/cache'
import { utilityGet, utilitySet } from './api'
import cache from '../data/cache'

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
            'itim': require('../assets/fonts/Itim-Regular.ttf'),
            'jockeyOne': require('../assets/fonts/JockeyOne-Regular.ttf'),
            'playpenSans': require('../assets/fonts/PlaypenSans-Regular.ttf'),
            'loveYa': require('../assets/fonts/LoveYaLikeASister-Regular.ttf'),
            'dekko': require('../assets/fonts/Dekko-Regular.ttf'),
            'play': require('../assets/fonts/Play-Regular.ttf'),
            'playBold': require('../assets/fonts/Play-Bold.ttf'),
        })
    } catch (error) {
        throw new Error('Error in loadFonts: ' + error.message)
    }
}

export async function edit(modelName, id, key, value) {
    try {
        await cache.push(modelName, id, key, value)
        cache.put(cache.key(modelName, id, key), value)

        return {
            success: true,
        }
    } catch (error) {
        return {
            success: false,
            error: error,
        }
    }
}


// REQUIRES:    nothing
// MODIFIES:    nothing
// EFFECTS:     Gets the current date, them parses it for the month, day, and year.
//              Then, it formats the month as its 3-letter acronym, the day with its
//              suffix, and the year together. Then, returns the date object consisting
//              of month, day, year, and formatted.
export function getDate(newDate) {
    const currentDate = newDate.toLocaleDateString()
    const dateParts = currentDate.split('/')
    const month = parseInt(dateParts[0], 10)
    const day = parseInt(dateParts[1], 10)
    const year = parseInt(dateParts[2], 10)

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const formattedMonth = monthNames[month - 1]
    const formattedDay = day + (day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th')
    const formattedYear = year
    const date = `${formattedMonth} ${formattedDay}, ${formattedYear}`

    return { month, day, year, date }
}

// REQUIRES:    nothing
// MODIFIES:    nothing
// EFFECTS:     Gets the current time, then parses it for the hour, minute and second.
//              Then, it formats HR:MN:SC<pm/am> and returns the time object consisting
//              of hour, minute, second and formatted.
export function getTime(newDate) {
    const currentTime = newDate.toLocaleTimeString()
    const timeZone = getTimeZoneSymbol(newDate)
    const timeParts = currentTime.split(':')
    const hour = parseInt(timeParts[0], 10)
    const minute = parseInt(timeParts[1], 10)
    const second = parseInt(timeParts[2], 10)

    const formattedHour = hour > 12 ? hour - 12 : hour
    const formattedMinute = minute.toString().padStart(2, '0')
    const period = hour >= 12 ? 'pm' : 'am'
    const time = `${formattedHour}:${formattedMinute}${period} ${timeZone}`

    return { hour, minute, second, timeZone, time }
}


export function getTimeZoneSymbol(newDate) {
    const timeZoneAbbreviation = moment.tz(newDate, moment.tz.guess()).format('z')

    return timeZoneAbbreviation
}



// REQUIRES:    stable connection to the google API
//              permission from the user to get location
// MODIFIES:    nothing
// EFFECTS:     Gets the location of the user, then returns the latitude and longitude.
export async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
        throw new Error('Permission to access location was denied')
    }

    const location = await Location.getCurrentPositionAsync({})
    const { latitude, longitude } = location.coords

    return { latitude, longitude }
}


export async function getCoordinates(scraps, user) {
    const coordinates = await Promise.all(scraps.map(async (scrap) => ({
        latitude: await cache.get('Scrap', scrap, 'latitude', user),
        longitude: await cache.get('Scrap', scrap, 'longitude', user),
    })));

    return coordinates;
}
