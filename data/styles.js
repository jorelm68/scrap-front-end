import { Dimensions } from 'react-native'
import { Colors } from 'react-native-ui-lib'
export const dimensions = Dimensions.get('window')

export const light = {
    background: Colors.grey70,
    secondary: Colors.grey50,
    default: 'black',
    button: Colors.blue30,

    dimmed: Colors.grey40,
    inverse: 'white',
    error: Colors.red5,
    success: Colors.green5,
    interaction: Colors.blue10,
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

export const styles = {
    text1: 'itim',
    text2: 'jockeyOne',
    text3: 'playBold',
}