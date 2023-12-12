import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import FieldComponent from '../components/FieldComponent'
import useAuthor from '../hooks/useAuthor'
import AppContext from '../context/AppContext'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, dimensions } from '../data/styles'
import { regexAuthorEmail, regexAuthorFirstName, regexAuthorLastName, regexAuthorPassword, regexAuthorPseudonym } from '../data/regex'
import { errorAuthorEmail, errorAuthorFirstName, errorAuthorLastName, errorAuthorPassword, errorAuthorPseudonym } from '../data/error'
import { authorCheckCredentials, utilitySet } from '../data/api'
import { edit } from '../data/utility'
import cache from '../data/cache'
import DropDownComponent from '../components/DropDownComponent'

const Settings = () => {
    const { user, functions, setFunctions } = useContext(AppContext)

    const {
        firstName: initialFirstName,
        setFirstName: initialSetFirstName,
        lastName: initialLastName,
        setLastName: initialSetLastName,
        pseudonym: initialPseudonym,
        setPseudonym: initialSetPseudonym,
        email: initialEmail,
        setEmail: initailSetEmail,
        scraps,
        headshotAndCover: initialHeadshotAndCover,
    } = useAuthor(user, [
        'firstName',
        'lastName',
        'pseudonym',
        'email',
        'headshotAndCover',
        'scraps',
    ])

    useEffect(() => {
        setFunctions((prevFunctions) => ({
            ...prevFunctions,
            setHeadshotAndCover: async (selection) => {
                console.log(selection)
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
    const [pseudonym, setPseudonym] = useState(initialPseudonym)
    useEffect(() => {
        setPseudonym(initialPseudonym)
    }, [initialPseudonym])
    const [headshotAndCover, setHeadshotAndCover] = useState(initialHeadshotAndCover)
    useEffect(() => {
        setHeadshotAndCover(initialHeadshotAndCover)
    }, [initialHeadshotAndCover])

    return (
        <View>
            {headshotAndCover && (
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
            )}

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
                title='Email: '
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
        </View>
    )
}
export default Settings