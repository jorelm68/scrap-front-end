import React, { useContext, useState } from 'react'
import { View, Text, TextField, Button, Colors } from 'react-native-ui-lib'
import { regexAuthorEmail, regexAuthorFirstName, regexAuthorLastName, regexAuthorPassword, regexAuthorPseudonym } from '../../data/regex'
import { errorAuthorEmail, errorAuthorFirstName, errorAuthorLastName, errorAuthorPassword, errorAuthorPseudonym } from '../../data/error'
import { authorSignUp } from '../../data/api'
import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { useRouter } from 'expo-router'
import AppContext from '../../context/AppContext'
import { saveAccount, storeData } from '../../data/utility'
import LogoComponent from '../../components/LogoComponent'
import FieldComponent from '../../components/FieldComponent'
import ButtonComponent from '../../components/ButtonComponent'

const SignUp = () => {
  const router = useRouter()
  const { setUser } = useContext(AppContext)

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

  const handleSignUp = async () => {
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
        setError(response.error)
        return
      }

      const account = {
        author: response.data.author,
        pseudonym,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }

      await storeData('autothenticate', response.data.author)
      await saveAccount(account)

      setUser(response.data.author)
      router.back()
      router.replace('/feed')
    }
    else {
      router.back()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="padding" style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View width='100%' flex center>
          <LogoComponent />
          <FieldComponent
            placeholder='Pseudonym (username)'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(pseudonym) => {
              setPseudonym(pseudonym)
              setPseudonymError('')
              setError('')
            }}
            value={pseudonym}
            maxLength={16}
            width='80%'
          />
          <View>
            <Text center red5>{pseudonymError}</Text>
          </View>

          <FieldComponent
            placeholder='Email Address'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(email) => {
              setEmail(email)
              setEmailError('')
              setError('')
            }}
            value={email}
            width='80%'
          />
          <View>
            <Text center red5>{emailError}</Text>
          </View>

          <FieldComponent
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(password) => {
              setPassword(password)
              setPasswordError('')
              setError('')
            }}
            value={password}
            maxLength={24}
            width='80%'
          />
          <View>
            <Text center red5>{passwordError}</Text>
          </View>

          <FieldComponent
            placeholder='Confirm Password'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(confirmPassword) => {
              setConfirmPassword(confirmPassword)
              setConfirmPasswordError('')
              setError('')
            }}
            value={confirmPassword}
            maxLength={24}
            width='80%'
          />
          <View>
            <Text center red5>{confirmPasswordError}</Text>
          </View>

          <View width='100%' style={{ flexDirection: 'row' }}>
            <View width='10%' />
            <FieldComponent
              placeholder="First Name"
              autoCapitalize='words'
              autoCorrect={false}
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

            <FieldComponent
              placeholder="Last Name"
              autoCapitalize='words'
              autoCorrect={false}
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

          <View>
            <Text center red5>{firstNameError}{'\n'}{lastNameError}</Text>
          </View>

          <View height={24} />

          <View>
            <Text center red5>{error}</Text>
          </View>

          <View height={24} />

          <ButtonComponent
            label='Sign Up'
            size='large'
            width='50%'
            onPress={handleSignUp}
            iconOnRight
            icon='checkmark'
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default SignUp