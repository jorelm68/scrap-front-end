import { LoaderScreen, Colors } from 'react-native-ui-lib'
import React from 'react'
import { colors } from '../data/styles'

const Loading = () => {
    return (
        <LoaderScreen message={'Scrap'} color={colors.background} />
    )
}

export default Loading