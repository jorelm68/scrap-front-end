import { Redirect } from 'expo-router'
import { useRouter, Link } from 'expo-router'
import { TextField, Text, Button, Colors, View } from 'react-native-ui-lib'
import { useContext, useState } from 'react'
import { regexAuthorEmail, regexAuthorPseudonym, regexAuthorPassword } from '../../data/regex'
import { errorAuthorEmail, errorAuthorPseudonym, errorAuthorPassword } from '../../data/error'
import { authorSignIn } from '../../data/api'
import { storeData } from '../../data/utility'
import AppContext from '../../context/AppContext'
import { IconArrowForward, IconPerson } from '../../data/icons'

export default function App() {
  const { setUser, setAuthenticated, setLoading, accounts, setAccounts } = useContext(AppContext)
  const router = useRouter()

  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [valueError, setValueError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = async () => {
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

    if ((regexAuthorEmail.test(value) || regexAuthorPseudonym.test(value)) && regexAuthorPassword.test(password)) {
      const response = await authorSignIn(value, password)
      if (response.error) {
        setError(response.error)
      }
      else {
        const account = {
          author: response.data.author,
          pseudonym: response.data.pseudonym,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }

        await storeData('autothenticate', response.data.author)
        await storeAccount(account)
        setUser(response.data.author)
        router.replace('/one')
      }
    }
  }

  const storeAccount = async (account) => {
    const filteredAccounts = [...(accounts.filter(value => value.author !== account.author)), account]
    await storeData('accounts', JSON.stringify(filteredAccounts))
    setAccounts(filteredAccounts)
  }

  return (
    <View>
      <Button
        label=" Choose Account"
        size={Button.sizes.large}
        backgroundColor={Colors.blue1}
        onPress={() => router.push('chooseAccount')}
        iconSource={() => <IconPerson color={'white'} size={18} />}
      />
      <TextField
        placeholder={'Pseudonym or Email'}
        floatingPlaceholder
        onChangeText={(value) => {
          setValue(value)
          setValueError('')
          setError('')
        }}
        value={value}
        maxLength={30}
      />
      <Text>{valueError}</Text>
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
      <Text>{error}</Text>
      <Button
        label="Sign In "
        size={Button.sizes.large}
        backgroundColor={Colors.blue1}
        onPress={handleSignIn}
        iconOnRight
        iconSource={() => <IconArrowForward color='white' size={18} />}
      />
    </View>
  )
}