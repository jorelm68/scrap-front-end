const moment = require('moment-timezone')
import * as Font from 'expo-font'
import { Alert } from 'react-native'
import * as Location from 'expo-location'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import * as SecureStore from 'expo-secure-store'
import Cache from '../data/cache'
import { scrapSaveScrap, utilityGet, utilitySet } from './api'
import cache from '../data/cache'
import { deleteData, retrieveData, storeData } from './utility'

export async function offlineSaveScrap(scrap) {
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

export async function offlineGetScraps() {
    const data = await retrieveData('scraps')
    const scraps = JSON.parse(data)

    return scraps
}

export async function onlineSaveScraps() {
    const data = await retrieveData('scraps')
    const scraps = JSON.parse(data)

    for (const scrap of scraps) {
        const response = await scrapSaveScrap(scrap)
        if (!response.success) {
            Alert.alert('Error', response.error)
            return
        }
    }
    await deleteData('scraps')

    return {
        success: true,
    }
}

export async function offlineEdit(index, key, value) {
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

export async function offlineDeleteScrap(index) {
    const data = await retrieveData('scraps')
    let scraps = JSON.parse(data)

    scraps = [...scraps.slice(0, index), ...scraps.slice(index + 1, scraps.length)];

    await storeData('scraps', JSON.stringify(scraps))

    return {
        success: true,
    }
}