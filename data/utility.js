import * as Font from 'expo-font'
import { Alert, Platform } from 'react-native'
import * as Location from 'expo-location'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'
import cache from '../data/cache'

const storeData = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value)
    } catch (error) {
        console.log('error storing: ', error.message)
    }
}

const saveAccount = async (account) => {
    try {
        let accounts = await retrieveData('accounts')
        if (!accounts) {
            accounts = []
        }
        else {
            accounts = JSON.parse(accounts)
        }
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
const forgetAccount = async (account) => {
    try {
        let accounts = await retrieveData('accounts')
        if (!accounts) {
            accounts = []
        }
        else {
            accounts = JSON.parse(accounts)
        }
        const updatedAccounts = accounts.filter(storedAccount => storedAccount.author !== account.author)
        await storeData('accounts', JSON.stringify(updatedAccounts))
    } catch (error) {
        console.error('Error while forgetting account: ', error)
    }
}


const retrieveData = async (key) => {
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

const deleteData = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key)
    }
    catch (error) {
        console.log('error deleting: ', error.message)
    }
}

const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

const loadFonts = async () => {
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

const edit = async (modelName, id, key, value) => {
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
const getDate = (newDate) => {
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

    const date = `${formattedMonth} ${formattedDay}, ${year} at ${formattedHours}:${formattedMinutes} ${ampm}`;
    return date;
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Add 1 because getMonth() returns zero-based month
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    return `${month}/${day}/${year}`;
}

const getDateRange = (date1, date2) => {
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
const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
        throw new Error('Permission to access location was denied')
    }

    const location = await Location.getCurrentPositionAsync({})
    const { latitude, longitude } = location.coords

    return { latitude, longitude }
}

const onlineSaveScraps = async (user) => {
    const data = await retrieveData('scraps')
    const scraps = JSON.parse(data)

    if (scraps && scraps.length > 0) {
        for (const scrap of scraps) {
            scrap.author = user
            console.log('saving: ', scrap)
            const response = await scrapSaveScrap(scrap)
            if (!response.success) {
                Alert.alert('Error', response.error)
                return
            }
        }
        await deleteData('scraps')
    }

    return {
        success: true,
    }
}

const offlineSaveScrap = async (scrap) => {
    const data = await retrieveData('scraps')
    let scraps = JSON.parse(data)
    if (!scraps) {
        scraps = []
    }
    scraps.push(scrap)
    await storeData('scraps', JSON.stringify(scraps))

    return {
        success: true,
    }
}

const offlineGetScraps = async () => {
    const data = await retrieveData('scraps')
    const scraps = JSON.parse(data)

    return scraps
}

const hasOfflineScraps = async () => {
    const data = await retrieveData('scraps')
    const scraps = JSON.parse(data)

    return scraps && scraps.length > 0
}

const offlineEdit = async (index, key, value) => {
    const data = await retrieveData('scraps')
    let scraps = JSON.parse(data)

    let scrap = scraps[index]
    scrap[key] = value
    scraps[index] = scrap

    await storeData('scraps', JSON.stringify(scraps))

    return {
        success: true,
    }
}

const offlineDeleteScrap = async (index) => {
    const data = await utility.retrieveData('scraps')
    let scraps = JSON.parse(data)

    scraps = [...scraps.slice(0, index), ...scraps.slice(index + 1, scraps.length)];

    await storeData('scraps', JSON.stringify(scraps))

    return {
        success: true,
    }
}

const getTab = (pathname) => {
    const parts = pathname.split('/')
    return parts[1]
}

const formatName = (firstName, lastName, pseudonym) => {
    return firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`
}

export default {
    storeData,
    saveAccount,
    forgetAccount,
    retrieveData,
    deleteData,
    registerForPushNotificationsAsync,
    loadFonts,
    edit,
    getDate,
    formatDate,
    getDateRange,
    getLocation,
    isDeviceOffline,
    onlineSaveScraps,
    offlineSaveScrap,
    offlineGetScraps,
    hasOfflineScraps,
    offlineEdit,
    offlineDeleteScrap,
    getTab,
    formatName,
}