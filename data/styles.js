import { Dimensions } from 'react-native'
export const dimensions = Dimensions.get('window')

// https://paletton.com/#uid=73i050kllllaFw0g0qFqFg0w0aF

export const dark = {
    color0: '#000000',
    color1: '#111111',
    color2: '#333333',
    color3: '#555555',
    color4: '#888888',
    color5: '#AAAAAA',
    color6: '#CCCCCC',
    color7: '#FFFFFF',

    accent: '#17CC5B',
};

export const light = {
    color0: '#FFFFFF',
    color1: '#CCCCCC',
    color2: '#AAAAAA',
    color3: '#888888',
    color4: '#555555',
    color5: '#333333',
    color6: '#111111',
    color7: '#000000',

    accent: '#17CC5B',
}

export const palette = dark

export const fonts = {
    itim: 'itim',
    jockeyOne: 'jockeyOne',
    playBold: 'playBold',
}

export const options = {
    headerTitleStyle: {
        fontFamily: fonts.playBold,
        fontSize: 24,
        color: palette.color7,
    },
    headerStyle: {
        backgroundColor: palette.color0,
    },
    tabBarStyle: {
        backgroundColor: palette.color0,
    },
    tabBarInactiveTintColor: palette.color6,
    tabBarActiveTintColor: palette.accent,
}