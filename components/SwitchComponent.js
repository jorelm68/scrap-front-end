import { View, Text, TouchableOpacity, Switch } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import DropDownComponent from '../components/DropDownComponent'
import { regexBookDescription, regexBookTitle } from '../data/regex'
import { errorBookDescription, errorBookTitle } from '../data/error'
import { useNavigation, useRouter } from 'expo-router'
import { bookSaveBook } from '../data/api'
import { Ionicons } from '@expo/vector-icons'
import { fonts, dimensions } from '../data/styles'
import ButtonComponent from '../components/ButtonComponent'
import useAuthor from '../hooks/useAuthor'
import ScrapComponent from '../components/ScrapComponent'

const SwitchComponent = ({ title, value, onSwitch }) => {
    const { palette } = useContext(AppContext)
    return (
        <View centerV row>
            <Text style={{
                fontFamily: fonts.itim,
                fontSize: 12,
                paddingRight: 4,
                color: palette.color5,
            }}>{title}</Text>
            <Switch value={value} onValueChange={onSwitch} onColor={palette.accent} offColor={palette.color5}/>
        </View>
    )
}

export default SwitchComponent