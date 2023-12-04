import React, { useContext, useState } from 'react'
import { View, Text, TextField, Button, Colors } from 'react-native-ui-lib'
import { regexAuthorEmail, regexAuthorFirstName, regexAuthorLastName, regexAuthorPassword, regexAuthorPseudonym } from '../../data/regex'
import { errorAuthorEmail, errorAuthorFirstName, errorAuthorLastName, errorAuthorPassword, errorAuthorPseudonym } from '../../data/error'
import { authorSignUp } from '../../data/api'
import { Alert } from 'react-native'
import { useRouter } from 'expo-router'
import AppContext from '../../context/AppContext'
import { saveAccount, storeData } from '../../data/utility'

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
      router.replace('/one')
    }
  }

  return (
    <View>
      <TextField
        placeholder={'Pseudonym (username)'}
        floatingPlaceholder
        onChangeText={(pseudonym) => {
          setPseudonym(pseudonym)
          setPseudonymError('')
          setError('')
        }}
        value={pseudonym}
        maxLength={16}
      />
      <Text>{pseudonymError}</Text>

      <TextField
        placeholder={'Email Address'}
        floatingPlaceholder
        onChangeText={(email) => {
          setEmail(email)
          setEmailError('')
          setError('')
        }}
        value={email}
        maxLength={30}
      />
      <Text>{emailError}</Text>

      <TextField
        placeholder={'Password'}
        floatingPlaceholder
        onChangeText={(password) => {
          setPassword(password)
          setPasswordError('')
          setError('')
        }}
        value={password}
        maxLength={30}
      />
      <Text>{passwordError}</Text>

      <TextField
        placeholder={'Confirm Password'}
        floatingPlaceholder
        onChangeText={(confirmPassword) => {
          setConfirmPassword(confirmPassword)
          setConfirmPasswordError('')
          setError('')
        }}
        value={confirmPassword}
        maxLength={30}
      />
      <Text>{confirmPasswordError}</Text>

      <TextField
        placeholder={'First Name'}
        floatingPlaceholder
        onChangeText={(firstName) => {
          setFirstName(firstName)
          setFirstNameError('')
          setError('')
        }}
        value={firstName}
        maxLength={30}
      />
      <Text>{firstNameError}</Text>

      <TextField
        placeholder={'Last Name'}
        floatingPlaceholder
        onChangeText={(lastName) => {
          setLastName(lastName)
          setLastNameError('')
          setError('')
        }}
        value={lastName}
        maxLength={30}
      />
      <Text>{lastNameError}</Text>

      <Text>{error}</Text>

      <Button
        label={'Sign Up'}
        size={Button.sizes.large}
        backgroundColor={Colors.blue1}
        onPress={handleSignUp}
      />
    </View>
  )
}

export default SignUp