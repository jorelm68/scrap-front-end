import { View, Text } from 'react-native-ui-lib'
import React, { useState } from 'react'
import ErrorComponent from '../../components/ErrorComponent'
import FieldComponent from '../../components/FieldComponent'
import { dimensions, fonts, palette } from '../../data/styles'
import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import ButtonComponent from '../../components/ButtonComponent'
import { regexAuthorEmail } from '../../data/regex'
import { errorAuthorEmail } from '../../data/error'
import { authorForgotPassword } from '../../data/api'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView behavior="padding" style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View flex center style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    backgroundColor: palette.primary0,
                }}>
                    <View>
                        <Text style={{
                            fontFamily: fonts.itim,
                            fontSize: 16,
                            color: palette.primary4,
                            marginVertical: 16,
                        }}>Please provide the email associated with your account</Text>
                    </View>

                    <FieldComponent
                        placeholder={'Email'}
                        autoCorrect={false}
                        autoCapitalize='none'
                        autoComplete='off'
                        onChangeText={(value) => {
                            setEmail(value)
                            setEmailError('')
                        }}
                        value={email}
                        alignment='center'
                        width='80%'
                    />
                    <ErrorComponent error={emailError} />

                    <ButtonComponent
                        label='Request Password Change'
                        icon='lock-closed'
                        onPress={async () => {
                            if (!regexAuthorEmail.test(email)) {
                                setEmailError(errorAuthorEmail)
                            }
                            else {
                                setEmailError('')
                                const response = await authorForgotPassword(email)
                                if (!response.success) {
                                    setEmailError(response.error)
                                }
                                else {
                                    Alert.alert('Success', 'Please check your email to continue resetting your password')
                                    router.back()
                                }
                            }
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default ForgotPassword