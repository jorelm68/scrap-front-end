import { Redirect } from 'expo-router'
import { router, Link } from 'expo-router'
import { Text, View } from 'react-native-ui-lib'
import { useContext, useEffect, useState } from 'react'
import regex from '../data/regex'
import error from '../data/error'
import api from '../data/api'
import utility from '../data/utility'
import AppContext from '../context/AppContext'
import { dimensions, fonts } from '../data/styles'
import Field from '../components/Field'
import Button from '../components/Button'
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import Logo from '../components/Logo'
import Error from '../components/Error'
import cache from '../data/cache'

const Screen = () => {
  const { setUser, paused, setPaused, palette } = useContext(AppContext)
  const [accounts, setAccounts] = useState([])
  useEffect(() => {
    utility.retrieveData('accounts').then((accounts) => {
      setAccounts(JSON.parse(accounts))
    }).catch(() => { })
  }, [])

  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [valueError, setValueError] = useState('')
  const [passwordError, setPasswordError] = useState('')
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
          {accounts && accounts.length !== 0 && (
            <Button
              label='Choose Account'
              icon='person'
              onPress={() => {
                router.navigate('/authentication/chooseAccount')
              }}
            />
          )}

          <View height={24} />

          <Field
            placeholder='Pseudonym or Email'
            autoCorrect={false}
            autoCapitalize='none'
            autoComplete='off'
            onChangeText={(value) => {
              setValue(value)
              setValueError('')
              setTextError('')
            }}
            value={value}
            alignment='center'
            width='80%'
          />
          <Error error={valueError} />

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
            alignment='center'
            width='80%'
          />
          <Error error={passwordError} />
          <Error error={textError} />

          <View center>
            <TouchableOpacity onPress={() => {
              router.navigate('/authentication/forgotPassword')
            }}>
              <Text style={{
                fontFamily: fonts.itim,
                fontSize: 12,
                color: palette.color5,
              }}>Forgot Password?</Text>
            </TouchableOpacity>

            <View height={16} />
            <Button
              label='Sign In'
              icon='checkmark'
              onPress={async () => {
                if (paused) return { success: false, error: 'Please don\'t click too fast' }
                setPaused(true)
                router.navigate('/loading')
                // First set the error messages if necessary
                if (!regex.author.pseudonymOrEmail.test(value)) {
                  setValueError(error.author.pseudonymOrEmail)
                }
                else {
                  setValueError('')
                }

                // Make sure the password submitted makes sense
                if (!regex.author.password.test(password)) {
                  setPasswordError(error.author.password)
                }
                else {
                  setPasswordError('')
                }

                // Now, make sure all tests pass
                if (!regex.author.pseudonymOrEmail.test(value) || !regex.author.password.test(password)) {
                  setPaused(false)
                  router.back()
                  return
                }

                // If all tests pass, make a sign in request to the back-end
                const response = await api.author.signIn(value, password)
                if (response.error) {
                  setPaused(false)
                  router.back()
                  setTextError(response.error)
                  return
                }

                // If successfully signed in, save the account to the device for future use
                const account = {
                  author: response.data.author,
                  pseudonym: response.data.pseudonym,
                  token: response.data.token,
                  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                }

                const token = await cache.get('Author', response.data.author, 'token', response.data.author)
                const autothenticate = { author: response.data.author, token: token }
                await utility.storeData('autothenticate', JSON.stringify(autothenticate))
                await utility.saveAccount(account)

                setUser(response.data.author)
                const yes = await utility.hasOfflineScraps()
                if (yes) {
                  const response1 = await utility.onlineSaveScraps(response.data.author)
                  if (response1.success) {
                    console.log('successfully saved scraps')
                  }
                }
                router.back()
                router.replace('/camera')
                setPaused(false)

              }}
            />
          </View>

          <View height={24} />

          <Button
            label='Sign Up'
            size='large'
            onPress={() => {
              router.navigate('/authentication/signUp')
            }}
            icon='person-add'
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default Screen