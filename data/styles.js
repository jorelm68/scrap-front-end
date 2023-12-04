import { Dimensions } from 'react-native'
const dimensions = Dimensions.get('window')

export const light = {
    background: '#FFFFFF',
    header: '#2C6AD3',
    headerTitle: '#2C6AD3',
    headerInteraction: '#2C6AD3',
    placeholderText: '#666666',
    textField: '#FFFFFF',
    button1: '#2C6AD3',
    button1Text: '#2C6AD3',
    button2: '#2C6AD3',
    button2Text: '#2C6AD3',
    text: '#2C6AD3',
    textError: '#2C6AD3',
    textInteracton: '#2C6AD3',
}
export const dark = {
    background: '#000000',
    header: '#2C6AD3',
    headerTitle: '#2C6AD3',
    headerInteraction: '#2C6AD3',
    button1: '#2C6AD3',
    button1Text: '#2C6AD3',
    button2: '#2C6AD3',
    button2Text: '#2C6AD3',
    text: '#2C6AD3',
    textError: '#2C6AD3',
    textInteracton: '#2C6AD3',
}

export const colors = light

export const styles = {
    textFieldContainer: {
        backgroundColor: colors.textField,
        width: dimensions.width * 3 / 4,
        marginLeft: dimensions.width / 8,
        borderRadius: 16,
        height: 32,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
    },

}