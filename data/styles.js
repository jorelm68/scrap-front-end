import { Dimensions } from 'react-native'
import { Colors } from 'react-native-ui-lib'
export const dimensions = Dimensions.get('window')

export const light = {
    background: Colors.grey70,
    active: '#85ADB1',
    default: 'black',
    secondary: '#BAA883',
    interaction: '#548486',

    dimmed: Colors.grey40,
    inverse: 'white',
    error: Colors.red5,
    success: Colors.green5,
}
export const dark = {
    background: '#000000',
    header: '#2C6AD3',
    headerTitle: '#2C6AD3',
    headerInteraction: '#2C6AD3',
    button1: '#2C6AD3',
    button1Text: '#FFFFFF',
    button2: '#2C6AD3',
    button2Text: '#2C6AD3',
    text: '#2C6AD3',
    textError: '#2C6AD3',
    textInteracton: '#2C6AD3',
}

// https://paletton.com/#uid=73i050kllllaFw0g0qFqFg0w0aF
export const colors = light

export const palette = {
    primary0: '#226666',
    primary1: '#669999',
    primary2: '#407F7F',
    primary3: '#0D4D4D',
    primary4: '#003333',

    secondary00: '#255C69',
    secondary01: '#6B949E',
    secondary02: '#447784',
    secondary03: '#0F434F',
    secondary04: '#012B35',

    secondary10: '#AA7139',
    secondary11: '#FFD4AA',
    secondary12: '#D49F6A',
    secondary13: '#804A15',
    secondary14: '#552A00',

    complement0: '#AA6C39',
    complement1: '#FFD1AA',
    complement2: '#D49A6A',
    complement3: '#804515',
    complement4: '#552600',

    black: 'black',
}

export const fonts = {
    itim: 'itim',
    jockeyOne: 'jockeyOne',
    playBold: 'playBold',
}