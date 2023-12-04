import { Redirect } from 'expo-router'
import { useRouter, Link } from 'expo-router'
import { TextField, Text, Button, Colors, View } from 'react-native-ui-lib'
import { useContext, useEffect, useState } from 'react'
import { regexAuthorEmail, regexAuthorPseudonym, regexAuthorPassword } from '../../data/regex'
import { errorAuthorEmail, errorAuthorPseudonym, errorAuthorPassword } from '../../data/error'
import { authorSignIn } from '../../data/api'
import { retrieveData, saveAccount, storeData } from '../../data/utility'
import AppContext from '../../context/AppContext'
import { IconArrowForward, IconPerson } from '../../data/icons'

export default function App() {
  const { setUser } = useContext(AppContext)
  const [accounts, setAccounts] = useState([])
  console.log(accounts)
  const router = useRouter()
  useEffect(() => {
    retrieveData('accounts').then((accounts) => {
      setAccounts(JSON.parse(accounts))
    }).catch(() => { })
  }, [])

  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [valueError, setValueError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')

  // Function for handling when the user presses the Sign In button
  const handleSignIn = async () => {
    // First, check if the value submitted is an email or not
    // This if statement is strictly for setting the error messages
    if (value.includes('@')) {
      // Now check if the email is valid
      if (!regexAuthorEmail.test(value)) {
        setValueError(errorAuthorEmail)
      }
      else {
        setValueError('')
      }
    }
    else {
      // Now check if the pseudonym is valid
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

    // Now, make sure all tests pass
    if ((regexAuthorEmail.test(value) || regexAuthorPseudonym.test(value)) && regexAuthorPassword.test(password)) {
      // If all tests pass, make a sign in request to the back-end
      const response = await authorSignIn(value, password)
      if (response.error) {
        setError(response.error)
      }
      else {
        // If successfully signed in, save the account to the device for future use
        const account = {
          author: response.data.author,
          pseudonym: response.data.pseudonym,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }

        await storeData('autothenticate', response.data.author)
        await saveAccount(account)

        setUser(response.data.author)
        router.replace('/one')
      }
    }
  }

  // Function for handling when the user presses the Choose Account button
  const handleChooseAccount = async () => {
    router.push('chooseAccount')
  }

  return (
    <View>
      {accounts && accounts.length !== 0 && (
        <Button
          label=" Choose Account"
          size={Button.sizes.large}
          backgroundColor={Colors.blue1}
          onPress={() => handleChooseAccount()}
          iconSource={() => <IconPerson color={'white'} size={18} />}
        />
      )}

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