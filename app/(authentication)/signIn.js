import { Redirect } from 'expo-router'
import { useRouter, Link } from 'expo-router'
import { Text, View } from 'react-native-ui-lib'
import { useContext, useEffect, useState } from 'react'
import { regexAuthorPseudonymOrEmail, regexAuthorPassword } from '../../data/regex'
import { errorAuthorPseudonymOrEmail, errorAuthorPassword } from '../../data/error'
import { authorSignIn } from '../../data/api'
import { retrieveData, saveAccount, storeData } from '../../data/utility'
import AppContext from '../../context/AppContext'
import { IconPerson } from '../../data/icons'
import { colors, styles } from '../../data/styles'
import FieldComponent from '../../components/FieldComponent'
import ButtonComponent from '../../components/ButtonComponent'
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import LogoComponent from '../../components/LogoComponent'

export default function App() {
  const { setUser } = useContext(AppContext)
  const [accounts, setAccounts] = useState([])
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
    router.push('/loading')
    // First set the error messages if necessary
    if (!regexAuthorPseudonymOrEmail.test(value)) {
      setValueError(errorAuthorPseudonymOrEmail)
    }
    else {
      setValueError('')
    }

    // Make sure the password submitted makes sense
    if (!regexAuthorPassword.test(password)) {
      setPasswordError(errorAuthorPassword)
    }
    else {
      setPasswordError('')
    }

    // Now, make sure all tests pass
    if (regexAuthorPseudonymOrEmail.test(value) & regexAuthorPassword.test(password)) {
      // If all tests pass, make a sign in request to the back-end
      const response = await authorSignIn(value, password)
      if (response.error) {
        router.back()
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
        router.back()
        router.replace('/feed')
      }
    }
    else {
      router.back()
    }
  }

  // Function for handling when the user switches to the sign up screen
  const handleSignUp = async () => {
    router.push('signUp')
  }

  // Function for handling when the user presses the Choose Account button
  const handleChooseAccount = async () => {
    router.push('chooseAccount')
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
          {accounts && accounts.length !== 0 && (
            <ButtonComponent
              label='Choose Account'
              size='large'
              onPress={handleChooseAccount}
              icon='person'
            />
          )}

          <View height={24} />

          <FieldComponent
            placeholder={'Pseudonym or Email'}
            autoCorrect={false}
            autoCapitalize='none'
            autoComplete='off'
            onChangeText={(value) => {
              setValue(value)
              setValueError('')
              setError('')
            }}
            value={value}
            alignment='center'
            width='80%'
          />
          <View>
            <Text center red5>{valueError}</Text>
          </View>

          <FieldComponent
            placeholder={'Password'}
            autoCapitalize='none'
            autoCorrect={false}
            autoComplete='off'
            onChangeText={(password) => {
              setPassword(password)
              setPasswordError('')
              setError('')
            }}
            value={password}
            maxLength={24}
            alignment='center'
            width='80%'
          />
          <View>
            <Text center red5>{passwordError}</Text>
          </View>

          <View height={24} />

          <View>
            <Text center red5>{error}</Text>
          </View>

          <View height={24} />

          <ButtonComponent
            label='Sign In'
            size='large'
            onPress={handleSignIn}
            icon='checkmark'
            iconOnRight
          />

          <View height={24} />

          <ButtonComponent
            label='Sign Up'
            size='large'
            onPress={handleSignUp}
            icon='person-add'
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}