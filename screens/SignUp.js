import React, { useContext, useState } from 'react'
import { View, Text, TextField } from 'react-native-ui-lib'
import regex from '../data/regex'
import error from '../data/error'
import api from '../data/api'
import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { useRouter } from 'expo-router'
import AppContext from '../context/AppContext'
import utility from '../data/utility'
import Logo from '../components/Logo'
import Field from '../components/Field'
import Button from '../components/Button'
import Error from '../components/Error'
import { dimensions } from '../data/styles'

const Screen = () => {
  const router = useRouter()
  const { setUser, paused, setPaused, palette } = useContext(AppContext)

  const [pseudonym, setPseudonym] = useState('')
  const [pseudonymError, setPseudonymError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [nameError, setNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [textError, setTextError] = useState('')

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="padding" style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View width='100%' flex center style={{
          width: dimensions.width,
          height: dimensions.height,
          backgroundColor: palette.color1,
        }}>
          <Logo />
          <Field
            placeholder='Pseudonym (username)'
            autoCapitalize='none'
            autoCorrect={false}
            autoComplete='off'
            onChangeText={(pseudonym) => {
              setPseudonym(pseudonym)
              setPseudonymError('')
              setTextError('')
            }}
            value={pseudonym}
            maxLength={16}
            width='80%'
          />
          <Error error={pseudonymError} />

          <Field
            placeholder='Email Address'
            autoCapitalize='none'
            autoCorrect={false}
            autoComplete='off'
            onChangeText={(email) => {
              setEmail(email)
              setEmailError('')
              setTextError('')
            }}
            value={email}
            width='80%'
          />
          <Error error={emailError} />

          <Field
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            autoComplete='off'
            secureTextEntry={true}
            onChangeText={(password) => {
              setPassword(password)
              setPasswordError('')
              setTextError('')
            }}
            value={password}
            maxLength={24}
            width='80%'
          />
          <Error error={passwordError} />

          <Field
            placeholder='Confirm Password'
            autoCapitalize='none'
            autoCorrect={false}
            autoComplete='off'
            secureTextEntry={true}
            onChangeText={(confirmPassword) => {
              setConfirmPassword(confirmPassword)
              setConfirmPasswordError('')
              setTextError('')
            }}
            value={confirmPassword}
            maxLength={24}
            width='80%'
          />
          <Error error={confirmPasswordError} />

          <View width='100%' style={{ flexDirection: 'row' }}>
            <View width='10%' />
            <Field
              placeholder="First Name"
              autoCapitalize='words'
              autoCorrect={false}
              autoComplete='off'
              onChangeText={(firstName) => {
                setFirstName(firstName);
                setNameError('');
                setTextError('');
              }}
              value={firstName}
              maxLength={24}
              width='38.75%'
            />
            <View width='2.5%' />

            <Field
              placeholder="Last Name"
              autoCapitalize='words'
              autoCorrect={false}
              autoComplete='off'
              onChangeText={(lastName) => {
                setLastName(lastName);
                setNameError('');
                setTextError('');
              }}
              value={lastName}
              maxLength={24}
              width='38.75%'
            />
          </View>

          <Error error={nameError} />
          <Error error={textError} />

          <Button
            label='Sign Up'
            icon='checkmark-circle'
            onPress={async () => {
              if (paused) return { success: false, error: 'Please don\'t click too fast' }
              setPaused(true)
              router.push('/loading')
              if (!regex.author.pseudonym.test(pseudonym)) {
                setPseudonymError(error.author.pseudonym)
                setTextError('')
              }
              else {
                setPseudonymError('')
              }
              if (!regex.author.email.test(email)) {
                setEmailError(error.author.email)
                setTextError('')
              }
              else {
                setEmailError('')
              }
              if (!regex.author.password.test(password)) {
                setPasswordError(error.author.password)
                setTextError('')
              }
              else {
                setPasswordError('')
              }
              if (!regex.author.password.test(confirmPassword)) {
                setConfirmPasswordError(error.author.password)
                setTextError('')
              }
              else {
                setConfirmPasswordError('')
              }
              if (!regex.author.firstName.test(firstName)) {
                setNameError(error.author.name)
                setTextError('')
              }
              else {
                setNameError('')
              }
              if (!regex.author.lastName.test(lastName)) {
                setNameError(error.author.name)
                setTextError('')
              }
              else {
                setNameError('')
              }

              if (password !== confirmPassword) {
                setTextError('Passwords do not match')
              }

              if (
                regex.author.pseudonym.test(pseudonym) &&
                regex.author.email.test(email) &&
                regex.author.password.test(password) &&
                regex.author.password.test(confirmPassword) &&
                password === confirmPassword &&
                regex.author.firstName.test(firstName) &&
                regex.author.lastName.test(lastName)
              ) {
                const response = await api.author.signUp({
                  pseudonym,
                  email,
                  password,
                  firstName,
                  lastName,
                  createdAt: new Date(),
                })

                if (!response.success) {
                  router.back()
                  setPaused(false)
                  setTextError(response.error)
                  return
                }

                const account = {
                  author: response.data.author,
                  pseudonym,
                  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                }

                await utility.storeData('autothenticate', response.data.author)
                await utility.saveAccount(account)

                setUser(response.data.author)
                const yes = await hasOfflineScraps()
                if (yes) {
                  const response1 = await onlineSaveScraps(response.data.author)
                  if (response1.success) {
                    console.log('successfully saved scraps')
                  }
                }
                router.back()
                router.replace('/camera')
                setPaused(false)
              }
              else {
                router.back()
                setPaused(false)
              }
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default Screen