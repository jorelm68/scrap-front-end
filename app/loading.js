import { LoaderScreen, Colors } from 'react-native-ui-lib'
import React from 'react'
import { palette } from '../data/styles'

const Loading = () => {
    return (
        <LoaderScreen message={'Scrap'} color={palette.secondary11} />
    )
}

export default Loading