import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import FieldComponent from '../components/FieldComponent'
import useAuthor from '../hooks/useAuthor'
import AppContext from '../context/AppContext'
import { Alert, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { dimensions, palette } from '../data/styles'
import { regexAuthorAutobiography, regexAuthorEmail, regexAuthorFirstName, regexAuthorLastName, regexAuthorPassword, regexAuthorPseudonym } from '../data/regex'
import { errorAuthorAutobiography, errorAuthorEmail, errorAuthorFirstName, errorAuthorLastName, errorAuthorPassword, errorAuthorPseudonym } from '../data/error'
import { authorCheckCredentials, utilitySet } from '../data/api'
import { deleteData, edit } from '../data/utility'
import cache from '../data/cache'
import DropDownComponent from '../components/DropDownComponent'
import { useRouter } from 'expo-router'
import ButtonComponent from '../components/ButtonComponent'
import ErrorComponent from '../components/ErrorComponent'

const Settings = () => {
    const { user, functions, setFunctions } = useContext(AppContext)
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
                const response = await edit('Author', user, 'headshotAndCover', selection[0])
                cache.filter([user, 'headshotAndCover'])
                setHeadshotAndCover(selection[0])
                if (!response.success) {
                    Alert.alert('Error', 'Could not change headshot and cover')
                }
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

    // Function for handling when you press the logout button
    const handleLogout = async () => {
        deleteData('autothenticate')
        while (router.canGoBack()) {
            router.back()
        }
        router.replace('/signIn')
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView behavior="padding" style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <ScrollView style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    backgroundColor: palette.secondary11,
                }}>
                    <DropDownComponent
                        type='Scrap'
                        title='Headshot and Cover'
                        value={headshotAndCover}
                        options={scraps}
                        amount={1}
                        onSubmit={async () => {
                            router.push({
                                pathname: '/scrapPicker', params: {
                                    scraps: JSON.stringify(scraps),
                                    amount: JSON.stringify(1),
                                    functionName: 'setHeadshotAndCover',
                                }
                            })
                        }}
                    />

                    <DropDownComponent
                        type='Text'
                        title='First Name: '
                        value={firstName}
                        boxes={[
                            {
                                placeholder: 'New First Name',
                                regex: regexAuthorFirstName,
                                error: errorAuthorFirstName,
                                autoCorrect: false,
                                autoCapitalize: 'words',
                                autoComplete: 'off',
                            }
                        ]}
                        onSubmit={async (values) => {
                            const response = await edit('Author', user, 'firstName', values[0])
                            if (response.success) {
                                setFirstName(values[0])
                            }
                            return response
                        }}
                    />
                    <DropDownComponent
                        type='Text'
                        title='Last Name:'
                        value={lastName}
                        boxes={[
                            {
                                placeholder: 'New Last Name',
                                regex: regexAuthorLastName,
                                error: errorAuthorLastName,
                                autoCorrect: false,
                                autoCapitalize: 'words',
                                autoComplete: 'off'
                            }
                        ]}
                        onSubmit={async (values) => {
                            const response = await edit('Author', user, 'lastName', values[0])
                            if (response.success) {
                                setLastName(values[0])
                            }
                            return response
                        }}
                    />
                    <DropDownComponent
                        type='Text'
                        title='Autobiography:'
                        value={autobiography}
                        boxes={[
                            {
                                placeholder: 'New Autobiography',
                                regex: regexAuthorAutobiography,
                                error: errorAuthorAutobiography,
                                autoCorrect: true,
                                autoCapitalize: 'sentences',
                            }
                        ]}
                        onSubmit={async (values) => {
                            const response = await edit('Author', user, 'autobiography', values[0])
                            if (response.success) {
                                setAutobiography(values[0])
                            }
                            return response
                        }}
                    />

                    <DropDownComponent
                        type='Text'
                        title='Pseudonym:'
                        value={pseudonym}
                        boxes={[
                            {
                                placeholder: 'New Pseudonym',
                                regex: regexAuthorPseudonym,
                                error: errorAuthorPseudonym,
                                autoCorrect: false,
                                autoCapitalize: 'none',
                                autoComplete: 'off',
                            }
                        ]}
                        onSubmit={async (values) => {
                            const response = await edit('Author', user, 'pseudonym', values[0])
                            if (response.success) {
                                setPseudonym(values[0])
                            }
                            return response
                        }}
                    />

                    <DropDownComponent
                        type='Text'
                        title='Email:'
                        value={email}
                        boxes={[
                            {
                                placeholder: 'New Email',
                                regex: regexAuthorEmail,
                                error: errorAuthorEmail,
                                autoCorrect: false,
                                autoCapitalize: 'none',
                                autoComplete: 'off',
                            },
                            {
                                placeholder: 'Password',
                                regex: regexAuthorPassword,
                                error: errorAuthorPassword,
                                autoCorrect: false,
                                autoCapitalize: 'none',
                                autoComplete: 'off',
                            }
                        ]}
                        onSubmit={async (values) => {
                            const response = await authorCheckCredentials(user, values[1])
                            if (response.success) {
                                const response2 = await edit('Author', user, 'email', values[0])
                                if (response2.success) {
                                    setEmail(values[0])
                                }
                                return response2
                            }
                            return response
                        }}
                    />

                    <DropDownComponent
                        type='Text'
                        title='Password:'
                        value={'••••••••••••••••'}
                        boxes={[
                            {
                                placeholder: 'Password',
                                regex: regexAuthorPassword,
                                error: errorAuthorPassword,
                                autoCorrect: false,
                                autoCapitalize: 'none',
                                autoComplete: 'off',
                            },
                            {
                                placeholder: 'New Password',
                                regex: regexAuthorPassword,
                                error: errorAuthorPassword,
                                autoCorrect: false,
                                autoCapitalize: 'none',
                                autoComplete: 'off',
                            },
                            {
                                placeholder: 'Confirm New Password',
                                regex: regexAuthorPassword,
                                error: errorAuthorPassword,
                                autoCorrect: false,
                                autoCapitalize: 'none',
                                autoComplete: 'off',
                            },
                        ]}
                        onSubmit={async (values) => {
                            const password = values[0]
                            const newPassword = values[1]
                            const newPasswordConfirm = values[2]

                            const response = await authorCheckCredentials(user, password)
                            if (!response.success) {
                                return {
                                    success: false,
                                    message: response.error,
                                }
                            }

                            if (newPassword === newPasswordConfirm) {
                                return {
                                    success: false,
                                    message: 'New passwords do not match',
                                }
                            }

                            response = await edit('Author', user, 'password', password)
                            if (!response.success) {
                                return {
                                    success: false,
                                    message: response.error,
                                }
                            }

                            return {
                                success: true,
                            }
                        }}
                    />

                    <View height={16} />
                    <View center>
                        <ButtonComponent
                            label='Sign Out'
                            size='large'
                            onPress={handleLogout}
                            width='50%'
                        />
                    </View>
                    <View height={16} />

                    <View height={200} />
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
export default Settings