import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import FieldComponent from '../components/FieldComponent'
import useAuthor from '../hooks/useAuthor'
import AppContext from '../context/AppContext'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Keyboard, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, dimensions } from '../data/styles'
import { regexAuthorEmail, regexAuthorFirstName, regexAuthorLastName, regexAuthorPassword, regexAuthorPseudonym } from '../data/regex'
import { errorAuthorEmail, errorAuthorFirstName, errorAuthorLastName, errorAuthorPassword, errorAuthorPseudonym } from '../data/error'
import { authorCheckCredentials, utilitySet } from '../data/api'
import { edit } from '../data/utility'
import { useNavigation } from 'expo-router'
import DropDownComponent from '../components/DropDownComponent'

const Settings = () => {
    const { user } = useContext(AppContext)
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => { console.log('hello') }}>
                    <Ionicons name="checkmark" size={24} color={colors.textSuccess} />
                </TouchableOpacity>
            ),
        });
    }, [navigation])

    const {
        firstName: initialFirstName,
        setFirstName: initialSetFirstName,
        lastName: initialLastName,
        setLastName: initialSetLastName,
        pseudonym: initialPseudonym,
        setPseudonym: initialSetPseudonym,
        email: initialEmail,
        setEmail: initailSetEmail,
    } = useAuthor(user, [
        'firstName',
        'lastName',
        'pseudonym',
        'email',
    ])

    const [verified, setVerified] = useState(false)
    const [values, setValues] = useState([])
    console.log(values)

    const [email, setEmail] = useState(initialEmail)
    useEffect(() => {
        setEmail(initialEmail)
    }, [initialEmail])


    return (
        <View>
            <DropDownComponent
                title='Email: '
                value={email}
                boxes={[
                    {
                        placeholder: 'New Email',
                        name: 'email',
                        regex: regexAuthorEmail,
                        error: errorAuthorEmail,
                    },
                    {
                        placeholder: 'Bruh',
                        name: 'bruh',
                        regex: regexAuthorPassword,
                        error: errorAuthorPassword,
                    }
                ]}
                onSubmit={async (values) => {
                    const response = await authorCheckCredentials(user, values.password)
                    if (response.success) {
                        return {
                            success: true,
                        }
                    }
                    else {
                        return {
                            success: false,
                            error: response.error,
                        }
                    }
                }}
            />
        </View>
    )

    // if (!verified) {
    //     return (
    //         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    //             <KeyboardAvoidingView behavior='padding'>
    //                 <View style={{
    //                     height: '100%',
    //                     paddingTop: '10%',

    //                 }} centerH>
    //                     <FieldComponent
    //                         placeholder={`Please Verify your Password`}
    //                         width='80%'
    //                         autoCapitalize='none'
    //                         autoCorrect={false}
    //                         onSubmit={async (password) => {
    //                             const response = await authorCheckCredentials(user, password)
    //                             if (!response.success) {
    //                                 return {
    //                                     message: response.error,
    //                                     color: colors.textError,
    //                                     success: false,
    //                                 }
    //                             }
    //                             else {
    //                                 setVerified(true)
    //                                 Keyboard.dismiss()
    //                                 return {
    //                                     message: 'Successfully verified',
    //                                     color: colors.textSuccess,
    //                                     success: true,
    //                                 }
    //                             }
    //                         }}
    //                         validation={[
    //                             {
    //                                 test: (password) => {
    //                                     if (!regexAuthorPassword.test(password)) {
    //                                         return errorAuthorPassword
    //                                     }
    //                                     return null
    //                                 },
    //                                 color: colors.textError,
    //                             },
    //                         ]}
    //                     />
    //                 </View>
    //             </KeyboardAvoidingView>
    //         </TouchableWithoutFeedback>
    //     )
    // }
    // else {
    //     return (
    //         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    //             <KeyboardAvoidingView behavior='padding'>
    //                 <View style={{
    //                     paddingVertical: 50,
    //                 }} center>
    //                     <FieldComponent
    //                         placeholder={`First Name: ${firstName}`}
    //                         width='80%'
    //                         onSubmit={async (firstName) => {
    //                             const response = await edit('Author', user, 'firstName', firstName)
    //                             if (!response.success) {
    //                                 return {
    //                                     message: response.error,
    //                                     color: colors.textError,
    //                                     success: false,
    //                                 }
    //                             }
    //                             else {
    //                                 setFirstName(firstName)
    //                                 return {
    //                                     message: 'Successfully changed your first name',
    //                                     color: colors.textSuccess,
    //                                     success: true,
    //                                 }
    //                             }
    //                         }}
    //                         validation={[
    //                             {
    //                                 test: (firstName) => {
    //                                     if (!regexAuthorFirstName.test(firstName)) {
    //                                         return errorAuthorFirstName
    //                                     }
    //                                     return null
    //                                 },
    //                                 color: colors.textError,
    //                             }
    //                         ]}
    //                     />

    //                     <FieldComponent
    //                         placeholder={`Last Name: ${lastName}`}
    //                         width='80%'
    //                         onSubmit={async (lastName) => {
    //                             const response = await edit('Author', user, 'lastName', lastName)
    //                             if (!response.success) {
    //                                 return {
    //                                     color: colors.textError,
    //                                     message: response.error,
    //                                     success: false,
    //                                 }
    //                             }
    //                             else {
    //                                 setLastName(lastName)
    //                                 return {
    //                                     color: colors.textSuccess,
    //                                     message: 'Successfully changed your last name',
    //                                     success: true
    //                                 }
    //                             }
    //                         }}
    //                         validation={[
    //                             {
    //                                 test: (lastName) => {
    //                                     if (!regexAuthorLastName.test(lastName)) {
    //                                         return errorAuthorLastName
    //                                     }
    //                                     return null
    //                                 },
    //                                 color: colors.textError,
    //                             }
    //                         ]}
    //                     />

    //                     <FieldComponent
    //                         placeholder={`Pseudonym: ${pseudonym}`}
    //                         width='80%'
    //                         onSubmit={async (pseudonym) => {
    //                             const response = await edit('Author', user, 'pseudonym', pseudonym)
    //                             if (!response.success) {
    //                                 return {
    //                                     color: colors.textError,
    //                                     message: response.error,
    //                                     success: false,
    //                                 }
    //                             }
    //                             else {
    //                                 setPseudonym(pseudonym)
    //                                 return {
    //                                     color: colors.textSuccess,
    //                                     message: 'Successfully changed your pseudonym',
    //                                     success: true,
    //                                 }
    //                             }
    //                         }}
    //                         validation={[
    //                             {
    //                                 test: (pseudonym) => {
    //                                     if (!regexAuthorPseudonym.test(pseudonym)) {
    //                                         return errorAuthorPseudonym
    //                                     }
    //                                     return null
    //                                 },
    //                                 color: colors.textError,
    //                             }
    //                         ]}
    //                     />

    //                     <FieldComponent
    //                         placeholder={`Email: ${email}`}
    //                         width='80%'
    //                         onSubmit={async (email) => {
    //                             const response = await edit('Author', user, 'email', email)
    //                             if (!response.success) {
    //                                 return {
    //                                     color: colors.textError,
    //                                     message: response.error,
    //                                     success: false,
    //                                 }
    //                             }
    //                             else {
    //                                 setEmail(email)
    //                                 return {
    //                                     color: colors.textSuccess,
    //                                     message: 'Successfully changed your email, please check your inbox to verify',
    //                                     success: true,
    //                                 }
    //                             }
    //                         }}
    //                         validation={[
    //                             {
    //                                 test: (email) => {
    //                                     if (!regexAuthorEmail.test(email)) {
    //                                         return errorAuthorEmail
    //                                     }
    //                                     return null
    //                                 },
    //                                 color: colors.textError,
    //                             }
    //                         ]}
    //                     />

    //                     <View>
    //                         <FieldComponent
    //                             placeholder={`New Password`}
    //                             width={`${0.8 * 0.9 * 100}%`}
    //                             validation={[
    //                                 {
    //                                     test: (password) => {
    //                                         if (!regexAuthorPassword.test(password)) {
    //                                             return errorAuthorPassword
    //                                         }
    //                                         return null
    //                                     },
    //                                     color: colors.textError,
    //                                 }
    //                             ]}
    //                         />
    //                         <View height={2} />

    //                         <FieldComponent
    //                             placeholder='Confirm New Password'
    //                             width='80%'
    //                             onSubmit={async (password) => {
    //                                 const response = await edit('Author', user, 'password', password)
    //                                 if (!response.success) {
    //                                     return {
    //                                         color: colors.textError,
    //                                         message: response.error,
    //                                         success: false,
    //                                     }
    //                                 }
    //                                 else {
    //                                     return {
    //                                         color: colors.textSuccess,
    //                                         message: 'Successfully changed your password',
    //                                         success: true,
    //                                     }
    //                                 }
    //                             }}
    //                             validation={[
    //                                 {
    //                                     test: (password) => {
    //                                         if (!regexAuthorPassword.test(password)) {
    //                                             return errorAuthorPassword
    //                                         }
    //                                         return null
    //                                     },
    //                                     color: colors.textError,
    //                                 },
    //                             ]}
    //                         />
    //                     </View>

    //                 </View>
    //             </KeyboardAvoidingView>
    //         </TouchableWithoutFeedback>
    //     )
    // }
}

export default Settings