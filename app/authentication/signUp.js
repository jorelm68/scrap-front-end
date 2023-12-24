import React, { useContext, useState } from 'react'
import { View, Text, TextField } from 'react-native-ui-lib'
import { regexAuthorEmail, regexAuthorFirstName, regexAuthorLastName, regexAuthorPassword, regexAuthorPseudonym } from '../../data/regex'
import { errorAuthorEmail, errorAuthorFirstName, errorAuthorLastName, errorAuthorPassword, errorAuthorPseudonym } from '../../data/error'
import { authorSignUp } from '../../data/api'
import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { useRouter } from 'expo-router'
import AppContext from '../../context/AppContext'
import utility from '../../data/utility'
import Logo from '../../components/Logo'
import Field from '../../components/Field'
import Button from '../../components/Button'
import Error from '../../components/Error'
import { dimensions } from '../../data/styles'

const SignUp = () => {
  const router = useRouter()
  const { setUser, paused, setPaused, palette } = useContext(AppContext)

  const [pseudonym, setPseudonym] = useState('')
  const [pseudonymError, setPseudonymError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [error, setError] = useState('')

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
              setError('')
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
              setError('')
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
              setError('')
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
              setError('')
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
                setFirstNameError('');
                setError('');
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
                setLastNameError('');
                setError('');
              }}
              value={lastName}
              maxLength={24}
              width='38.75%'
            />
          </View>

          <Error error={firstNameError} />
          <Error error={error} />

          <Button
            label='Sign Up'
            icon='checkmark-circle'
            onPress={async () => {
              if (paused) return { success: false, error: 'Please don\'t click too fast' }
              setPaused(true)
              router.push('/loading')
              if (!regexAuthorPseudonym.test(pseudonym)) {
                setPseudonymError(errorAuthorPseudonym)
                setError('')
              }
              else {
                setPseudonymError('')
              }
              if (!regexAuthorEmail.test(email)) {
                setEmailError(errorAuthorEmail)
                setError('')
              }
              else {
                setEmailError('')
              }
              if (!regexAuthorPassword.test(password)) {
                setPasswordError(errorAuthorPassword)
                setError('')
              }
              else {
                setPasswordError('')
              }
              if (!regexAuthorPassword.test(confirmPassword)) {
                setConfirmPasswordError(errorAuthorPassword)
                setError('')
              }
              else {
                setConfirmPasswordError('')
              }
              if (!regexAuthorFirstName.test(firstName)) {
                setFirstNameError(errorAuthorFirstName)
                setError('')
              }
              else {
                setFirstNameError('')
              }
              if (!regexAuthorLastName.test(lastName)) {
                setLastNameError(errorAuthorLastName)
                setError('')
              }
              else {
                setLastNameError('')
              }

              if (password !== confirmPassword) {
                setError('Passwords do not match')
              }

              if (
                regexAuthorPseudonym.test(pseudonym) &&
                regexAuthorEmail.test(email) &&
                regexAuthorPassword.test(password) &&
                regexAuthorPassword.test(confirmPassword) &&
                password === confirmPassword &&
                regexAuthorFirstName.test(firstName) &&
                regexAuthorLastName.test(lastName)
              ) {
                const response = await authorSignUp({
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
                  setError(response.error)
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

export default SignUp