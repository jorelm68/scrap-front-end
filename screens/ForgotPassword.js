import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useState } from 'react'
import Error from '../components/Error'
import Field from '../components/Field'
import { dimensions, fonts } from '../data/styles'
import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import Button from '../components/Button'
import regex from '../data/regex'
import error from '../data/error'
import api from '../data/api'
import AppContext from '../context/AppContext'
import { useRouter } from 'expo-router'

const Screen = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const { paused, setPaused, palette } = useContext(AppContext)
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
                    backgroundColor: palette.color1,
                }}>
                    <View>
                        <Text style={{
                            fontFamily: fonts.itim,
                            fontSize: 16,
                            color: palette.color5,
                            marginVertical: 16,
                        }}>Please provide the email associated with your account</Text>
                    </View>

                    <Field
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
                    <Error error={emailError} />

                    <Button
                        label='Request Password Change'
                        icon='lock-closed'
                        onPress={async () => {
                            if (paused) return { success: false, error: 'Please don\'t click too fast' }
                            setPaused(true)
                            if (!regex.author.email.test(email)) {
                                setEmailError(error.author.email)
                            }
                            else {
                                setEmailError('')
                                const response = await api.author.forgotPassword(email)
                                if (!response.success) {
                                    setEmailError(response.error)
                                }
                                else {
                                    Alert.alert('Success', 'Please check your email to continue resetting your password')
                                    router.back()
                                }
                            }
                            setPaused(false)
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Screen