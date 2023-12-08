import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import { Ionicons } from '@expo/vector-icons'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import FieldComponent from './FieldComponent'
import ErrorComponent from './ErrorComponent'
import { colors } from '../data/styles'

const DropDownComponent = ({ title, value, onSubmit, boxes }) => {
    const [isDropped, setIsDropped] = useState(false)
    const [values, setValues] = useState([])
    const [submissions, setSubmissions] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        let newValues = []
        let newSubmissions = []
        boxes && boxes.forEach(() => {
            newValues.push('')
            newSubmissions.push(false)
        })

        setSubmissions(newSubmissions)
        setValues(newValues)
    }, [])

    const handleSubmit = async () => {
        let passing = true
        let newSubmissions = [
            ...submissions,
        ]
        boxes && boxes.forEach((box, index) => {
            newSubmissions[index] = true

            if (!box.regex.test(values[index])) {
                passing = false
            }
        })
        setSubmissions(newSubmissions)

        if (onSubmit && passing) {
            const { error, success } = await onSubmit(values)
            if (success) {
                setIsDropped(false)
                
                let newValues = []
                let newSubmissions = []
                boxes && boxes.forEach(() => {
                    newValues.push('')
                    newSubmissions.push(false)
                })
                setValues(newValues)
                setSubmissions(newSubmissions)
            }
            else {
                setError(error)
            }
        }
    }

    const handleChangeField = (index, text) => {
        const newValues = [
            ...values,
        ]
        const newSubmissions = [
            ...submissions,
        ]

        newValues[index] = text
        newSubmissions[index] = false
        setSubmissions(newSubmissions)
        setValues(newValues)
        setError('')
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            setIsDropped(!isDropped)
        }}>
            <KeyboardAvoidingView behavior='padding'>
                <View centerV style={{
                    minHeight: 48,
                    borderBottomWidth: 1,
                }}>
                    <View row center style={{
                    }}>
                        <Text style={{
                            fontFamily: styles.text1,
                            fontSize: 18,
                            width: '30%',
                            paddingLeft: 4,
                        }}>{title}</Text>
                        <Text style={{
                            fontFamily: styles.text1,
                            fontSize: 18,
                            width: '62.5%',
                        }}>{value}</Text>

                        <TouchableOpacity center style={{
                            width: '7.5%',
                            height: 48,
                        }} onPress={() => {
                            setIsDropped(!isDropped)
                        }}>
                            <Ionicons style={{
                            }} name={isDropped ? 'chevron-down' : 'chevron-forward'} size={24} />
                        </TouchableOpacity>
                    </View>

                    {isDropped && (
                        <View>
                            {boxes && boxes.length > 0 && boxes.map((box, index) => {
                                return (
                                    <View key={index}>
                                        <View row style={{
                                            paddingVertical: 8,
                                            paddingHorizontal: 4,
                                        }}>
                                            <FieldComponent
                                                placeholder={box.placeholder}
                                                autoCapitalize={box.autoCapitalize}
                                                autoCorrect={box.autoCorrect}
                                                autoComplete={box.autoComplete}
                                                width={index === boxes.length - 1 ? '90%' : '100%'}
                                                value={values[index]}
                                                onChangeText={(text) => {
                                                    handleChangeField(index, text)
                                                }}
                                            />
                                            {index === boxes.length - 1 && (
                                                <TouchableOpacity center style={{
                                                    width: '10%',
                                                }} onPress={handleSubmit}>
                                                    <Ionicons color={colors.success} name='checkmark' size={32} />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        {boxes && submissions[index] && !box.regex.test(values[index]) && (
                                            <ErrorComponent error={box.error} />
                                        )}
                                    </View>
                                )
                            })}
                            <ErrorComponent error={error} />
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default DropDownComponent