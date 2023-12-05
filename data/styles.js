import { Dimensions } from 'react-native'
import { Colors } from 'react-native-ui-lib'
export const dimensions = Dimensions.get('window')

export const light = {
    background: '#FFFFFF',
    secondary: Colors.grey50,
    header: '#2C6AD3',
    headerTitle: '#2C6AD3',
    headerInteraction: '#2C6AD3',
    placeholderText: '#666666',
    textField: '#FFFFFF',
    button1: Colors.blue1,
    button1Text: '#FFFFFF',
    button2: '#2C6AD3',
    button2Text: '#2C6AD3',
    text: '#2C6AD3',
    textError: Colors.red5,
    textSuccess: Colors.green5,
    textInteracton: '#2C6AD3',
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

export const colors = light