import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import { Ionicons } from '@expo/vector-icons'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import FieldComponent from './FieldComponent'
import ErrorComponent from './ErrorComponent'
import { colors } from '../data/styles'

const DropDownComponent = ({ title, value, onSubmit, boxes }) => {
    const [isDropped, setIsDropped] = useState(false)
    const [values, setValues] = useState({})
    const [error, setError] = useState('')
    console.log(values)

    useEffect(() => {
        let newValues = {
            ...values,
        }
        boxes.forEach((box) => {
            newValues = {
                ...newValues,
                [box.name]: '',
            }
        })
        setValues(newValues)
    }, [])

    const handleSubmit = async () => {
        let passing = true
        let newValues = {
            ...values,
        }
        boxes.forEach((box, index) => {
            console.log(index)
            newValues = {
                ...newValues,
                [index]: true,
            }

            if (!box.regex.test(values[box.name])) {
                passing = false
            }
        })
        setValues(newValues)

        if (passing) {
            const { error, success } = await onSubmit(values)
            if (success) {
                setIsDropped(false)
            }
            else {
                setError(error)
            }
        }
    }

    const handleChangeField = (name, index, text) => {
        const newValues = {
            ...values,
            [name]: text,
            [index]: false,
        }

        setError('')
        setValues(newValues)
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
                            fontFamily: 'itim',
                            fontSize: 18,
                            width: '20%',
                            paddingLeft: 4,
                        }}>{title}</Text>
                        <Text style={{
                            fontFamily: 'itim',
                            fontSize: 18,
                            width: '72.5%',
                            backgroundColor: 'brown',
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
                                                width={index === boxes.length - 1 ? '90%' : '100%'}
                                                value={values[box.name]}
                                                onChangeText={(text) => {
                                                    console.log(text)
                                                    handleChangeField(box.name, index, text)
                                                }}
                                            />
                                            {index === boxes.length - 1 && (
                                                <TouchableOpacity center style={{
                                                    width: '10%',
                                                }} onPress={handleSubmit}>
                                                    <Ionicons color={colors.textSuccess} name='checkmark' size={32} />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        {values[index] && !box.regex.test(values[box.name]) && (
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