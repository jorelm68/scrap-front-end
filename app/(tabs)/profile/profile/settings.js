import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import useAuthor from '../../../../hooks/useAuthor'
import AppContext from '../../../../context/AppContext'
import { Alert, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { dark, dimensions, light } from '../../../../data/styles'
import regex from '../../../../data/regex'
import error from '../../../../data/error'
import api from '../../../../data/api'
import utility from '../../../../data/utility'
import cache from '../../../../data/cache'
import DropDown from '../../../../components/DropDown'
import { useRouter } from 'expo-router'
import Field from '../../../../components/Field'
import Button from '../../../../components/Button'
import Error from '../../../../components/Error'
import Switch from '../../../../components/Switch'

const Settings = () => {
    const { user, tab, setFunctions, paused, setPaused, darkMode, setDarkMode, palette, setPalette } = useContext(AppContext)
    const router = useRouter()

    const {
        firstName: initialFirstName,
        lastName: initialLastName,
        autobiography: initialAutobiography,
        pseudonym: initialPseudonym,
        email: initialEmail,
        scraps,
        headshotAndCover: initialHeadshotAndCover,
    } = useAuthor(user, [
        'firstName',
        'lastName',
        'pseudonym',
        'autobiography',
        'email',
        'headshotAndCover',
        'scraps',
    ])

    useEffect(() => {
        setFunctions((prevFunctions) => ({
            ...prevFunctions,
            setHeadshotAndCover: async (selection) => {
                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                setPaused(true)
                const response = await utility.edit('Author', user, 'headshotAndCover', selection[0])
                cache.filter([user, 'headshotAndCover'])
                setHeadshotAndCover(selection[0])
                if (!response.success) {
                    Alert.alert('Error', 'Could not change headshot and cover')
                }
                setPaused(false)
            },
        }))
    }, [])

    const [email, setEmail] = useState(initialEmail)
    useEffect(() => {
        setEmail(initialEmail)
    }, [initialEmail])
    const [firstName, setFirstName] = useState(initialFirstName)
    useEffect(() => {
        setFirstName(initialFirstName)
    }, [initialFirstName])
    const [lastName, setLastName] = useState(initialLastName)
    useEffect(() => {
        setLastName(initialLastName)
    }, [initialLastName])
    const [autobiography, setAutobiography] = useState(initialAutobiography)
    useEffect(() => {
        setAutobiography(initialAutobiography)
    }, [initialAutobiography])
    const [pseudonym, setPseudonym] = useState(initialPseudonym)
    useEffect(() => {
        setPseudonym(initialPseudonym)
    }, [initialPseudonym])
    const [headshotAndCover, setHeadshotAndCover] = useState(initialHeadshotAndCover)
    useEffect(() => {
        setHeadshotAndCover(initialHeadshotAndCover)
    }, [initialHeadshotAndCover])

    return (
        <KeyboardAvoidingView behavior="padding" style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} style={{
                width: dimensions.width,
                height: dimensions.height,
                backgroundColor: palette.color1,
            }}>
                <DropDown
                    type='Scrap'
                    title='Headshot and Cover'
                    value={headshotAndCover}
                    options={scraps}
                    amount={1}
                    onSubmit={async () => {
                        router.navigate({
                            pathname: `/${tab}/book/chooseScraps`,
                            params: {
                                scraps: JSON.stringify(scraps),
                                amount: JSON.stringify(1),
                                functionName: 'setHeadshotAndCover',
                            }
                        })
                    }}
                />

                <DropDown
                    type='Text'
                    title='First Name: '
                    value={firstName}
                    boxes={[
                        {
                            placeholder: 'New First Name',
                            regex: regex.author.firstName,
                            error: error.author.firstName,
                            autoCorrect: false,
                            autoCapitalize: 'words',
                            autoComplete: 'off',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await utility.edit('Author', user, 'firstName', values[0])
                        if (response.success) {
                            cache.filter([user, firstName])
                            setFirstName(values[0])
                        }
                        setPaused(false)
                        return response
                    }}
                />
                <DropDown
                    type='Text'
                    title='Last Name:'
                    value={lastName}
                    boxes={[
                        {
                            placeholder: 'New Last Name',
                            regex: regex.author.lastName,
                            error: error.author.lastName,
                            autoCorrect: false,
                            autoCapitalize: 'words',
                            autoComplete: 'off'
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await utility.edit('Author', user, 'lastName', values[0])
                        if (response.success) {
                            cache.filter([user, 'lastName'])
                            setLastName(values[0])
                        }
                        setPaused(false)
                        return response
                    }}
                />
                <DropDown
                    type='Text'
                    title='Autobiography:'
                    value={autobiography}
                    boxes={[
                        {
                            placeholder: 'New Autobiography',
                            initial: autobiography,
                            regex: regex.author.autobiography,
                            error: error.author.autobiography,
                            autoCorrect: true,
                            autoCapitalize: 'sentences',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await utility.edit('Author', user, 'autobiography', values[0])
                        if (response.success) {
                            cache.filter([user, 'autobiography'])
                            setAutobiography(values[0])
                        }
                        setPaused(false)
                        return response
                    }}
                />

                <DropDown
                    type='Text'
                    title='Pseudonym:'
                    value={pseudonym}
                    boxes={[
                        {
                            placeholder: 'New Pseudonym',
                            regex: regex.author.pseudonym,
                            error: error.author.pseudonym,
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            autoComplete: 'off',
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await utility.edit('Author', user, 'pseudonym', values[0])
                        if (response.success) {
                            cache.filter([user, 'pseudonym'])
                            setPseudonym(values[0])
                        }
                        setPaused(false)
                        return response
                    }}
                />

                <DropDown
                    type='Text'
                    title='Email:'
                    value={email}
                    boxes={[
                        {
                            placeholder: 'New Email',
                            regex: regex.author.email,
                            error: error.author.email,
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            autoComplete: 'off',
                        },
                        {
                            placeholder: 'Password',
                            regex: regex.author.password,
                            error: error.author.password,
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            autoComplete: 'off',
                            secureTextEntry: true,
                        }
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const response = await api.author.checkCredentials(user, values[1])
                        if (response.success) {
                            const response2 = await utility.edit('Author', user, 'email', values[0])
                            if (response2.success) {
                                cache.filter([user, 'email'])
                                setEmail(values[0])
                            }
                            return response2
                        }
                        setPaused(false)
                        return response
                    }}
                />

                <DropDown
                    type='Text'
                    title='Password:'
                    value={'••••••••••••••••'}
                    boxes={[
                        {
                            placeholder: 'Password',
                            regex: regex.author.password,
                            error: error.author.password,
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            autoComplete: 'off',
                            secureTextEntry: true,
                        },
                        {
                            placeholder: 'New Password',
                            regex: regex.author.password,
                            error: error.author.password,
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            autoComplete: 'off',
                            secureTextEntry: true,
                        },
                        {
                            placeholder: 'Confirm New Password',
                            regex: regex.author.password,
                            error: error.author.password,
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            autoComplete: 'off',
                            secureTextEntry: true,
                        },
                    ]}
                    onSubmit={async (values) => {
                        if (paused) return { success: false, error: 'Please don\'t click too fast' }
                        setPaused(true)
                        const password = values[0]
                        const newPassword = values[1]
                        const newPasswordConfirm = values[2]

                        let response = await api.author.checkCredentials(user, password)
                        if (!response.success) {
                            setPaused(false)
                            return {
                                success: false,
                                error: response.error,
                            }
                        }

                        if (newPassword !== newPasswordConfirm) {
                            setPaused(false)
                            return {
                                success: false,
                                error: 'New passwords do not match',
                            }
                        }

                        response = await utility.edit('Author', user, 'password', newPassword)
                        if (!response.success) {
                            setPaused(false)
                            return {
                                success: false,
                                error: response.error,
                            }
                        }

                        setPaused(false)
                        return {
                            success: true,
                        }
                    }}
                />

                <View center style={{
                    marginTop: 16,
                }}>
                    <Switch
                        title='Dark Mode?'
                        value={darkMode}
                        onSwitch={async () => {
                            if (paused) return { success: false, error: 'Please don\'t click too fast' }
                            setPaused(true)
                            setDarkMode(!darkMode)
                            setPalette(!darkMode ? dark : light)
                            await utility.storeData('darkMode', JSON.stringify(!darkMode))
                            setPaused(false)
                        }}
                    />
                </View>

                <View center style={{
                    marginVertical: 16,
                }}>
                    <Button
                        label='Sign Out'
                        size='large'
                        onPress={async () => {
                            utility.deleteData('autothenticate')
                            cache.filter(['relationship'])
                            cache.filter(['profileBooks'])
                            while (router.canGoBack()) {
                                router.back()
                            }
                            router.replace('/signIn')
                        }}
                        icon='person-remove'
                        width='50%'
                    />
                </View>

                <View height={200} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default Settings