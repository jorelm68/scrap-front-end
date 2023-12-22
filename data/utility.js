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
    const dateObj = new Date(newDate);

    const month = dateObj.getMonth() + 1; // Months are zero-based
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedMonth = monthNames[month - 1];

    // Formatting the day with the correct suffix
    let formattedDay;
    if (day === 1 || day === 21 || day === 31) {
        formattedDay = day + 'st';
    } else if (day === 2 || day === 22) {
        formattedDay = day + 'nd';
    } else if (day === 3 || day === 23) {
        formattedDay = day + 'rd';
    } else {
        formattedDay = day + 'th';
    }

    // Convert hours from 24-hour to 12-hour format
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const date = `${formattedMonth} ${formattedDay}, ${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
    return date;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Add 1 because getMonth() returns zero-based month
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    return `${month}/${day}/${year}`;
}

export function getDateRange(date1, date2) {
    const formattedDate1 = formatDate(date1);
    const formattedDate2 = formatDate(date2);

    if (formattedDate1 === formattedDate2) {
        return formattedDate1
    }

    return `${formattedDate1} - ${formattedDate2}`
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