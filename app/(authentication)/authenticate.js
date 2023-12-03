import { Redirect } from 'expo-router'
import { View, Button, Alert } from 'react-native'
import { useRouter, Link } from 'expo-router'
import { TextField, Text } from 'react-native-ui-lib'
import { useContext, useState } from 'react'
import { regexAuthorEmail, regexAuthorPseudonym, regexAuthorPassword } from '../../data/regex'
import { errorAuthorEmail, errorAuthorPseudonym, errorAuthorPassword } from '../../data/error'
import { authorSignIn } from '../../data/api'
import { storeData } from '../../data/utility'
import AppContext from '../../context/AppContext'

export default function App() {
  const { setUser, setAuthenticated, setLoading, accounts, setAccounts } = useContext(AppContext)
  const router = useRouter()

  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [valueError, setValueError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    // Make sure the value submitted makes sense
    if (value.includes('@')) {
      if (!regexAuthorEmail.test(value)) {
        setValueError(errorAuthorEmail)
      }
      else {
        setValueError('')
      }
    }
    else {
      if (!regexAuthorPseudonym.test(value)) {
        setValueError(errorAuthorPseudonym)
      }
      else {
        setValueError('')
      }
    }

    // Make sure the password submitted makes sense
    if (!regexAuthorPassword.test(password)) {
      setPasswordError(errorAuthorPassword)
    }
    else {
      setPasswordError('')
    }

    if (!valueError && !passwordError) {
      const response = await authorSignIn(value, password)
      if (response.error) {
        setError(response.error)
      }
      else {
        const account = {
          author: response.data.user,
          pseudonym: response.data.pseudonym,
          expires: oneWeekFromNow(),
        }

        await storeData('autothenticate', response.data.user)
        await storeAccount(account)
        setUser(response.data.user)
        router.replace('/one')
      }
    }
  }

  const oneWeekFromNow = () => {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }

  const storeAccount = async (account) => {
    const filteredAccounts = [...(accounts.filter(value => value.author !== account.author)), account]
    setAccounts(filteredAccounts)
    await storeData('accounts', JSON.stringify(filteredAccounts))
  }

  return (
    <View>
      <TextField
        placeholder={'Pseudonym or Email'}
        floatingPlaceholder
        onChangeText={(value) => { setValue(value) }}
        value={value}
        maxLength={30}
      />
      <Text>{valueError}</Text>
      <TextField
        placeholder={'Password'}
        floatingPlaceholder
        onChangeText={(password) => { setPassword(password) }}
        value={password}
        maxLength={30}
      />
      <Text>{passwordError}</Text>
      <Text>{error}</Text>
      <Button title="Sign In" onPress={handleSubmit} />
    </View>
  )
}