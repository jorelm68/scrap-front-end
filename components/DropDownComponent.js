import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib'
import { Ionicons } from '@expo/vector-icons'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FieldComponent from './FieldComponent'
import ErrorComponent from './ErrorComponent'
import { styles, colors, dimensions } from '../data/styles'
import useScrap from '../hooks/useScrap'
import { useRouter } from 'expo-router'
import AppContext from '../context/AppContext'

const DropDownComponent = ({ title, value, onSubmit, topBorder, amount, type, boxes, options }) => {
    const router = useRouter()
    const [isDropped, setIsDropped] = useState(false)
    const [values, setValues] = useState([])
    const [submissions, setSubmissions] = useState([])
    const [error, setError] = useState('')

    const {
        iPrograph,
        iRetrograph,
    } = type === 'Scrap' ? value !== undefined ? useScrap(value, [
        'iPrograph->1080',
        'iRetrograph->1080',
    ]) : {} : {}

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
        <TouchableWithoutFeedback onPress={(type === 'Scrap') ? () => {
            onSubmit()
        } : () => {
            setIsDropped(!isDropped)
        }}>
            <KeyboardAvoidingView behavior='padding'>
                {type === 'Scrap' && (
                    <View centerV style={{
                        minHeight: 48,
                        borderBottomWidth: 1,
                        borderTopWidth: topBorder ? 1 : 0,
                    }}>
                        <View row center style={{
                        }}>
                            <Text style={{
                                fontFamily: styles.text1,
                                fontSize: 12, width: '30%',
                                paddingLeft: 4,
                            }}>{title}</Text>

                            {value !== undefined && (
                                <View style={{
                                    width: '62.5%',
                                }}>
                                    <Image source={iPrograph} style={{
                                        width: '100%',
                                        aspectRatio: 3,
                                        borderRadius: 8,
                                    }} />
                                    <Image source={iRetrograph} style={{
                                        position: 'absolute',
                                        width: `${(1 / 3) / 2 * 100}%`,
                                        aspectRatio: 1,
                                        borderRadius: 100,
                                        bottom: 0,
                                    }} />
                                </View>
                            )}
                            {value !== undefined && (
                                <View style={{
                                    width: '62.5%',
                                }} />
                            )}

                            <View center style={{
                                width: '7.5%',
                                height: 48,
                            }}>
                                <Ionicons style={{
                                }} name='pencil' size={24} />
                            </View>
                        </View>
                    </View>
                )}
                {type === 'Text' && (
                    <View centerV style={{
                        minHeight: 48,
                        borderBottomWidth: 1,
                        borderTopWidth: topBorder ? 1 : 0,
                    }}>
                        <View row center style={{
                        }}>
                            <Text style={{
                                fontFamily: styles.text1,
                                fontSize: 12,
                                width: '30%',
                                paddingLeft: 4,
                            }}>{title}</Text>
                            <Text style={{
                                fontFamily: styles.text1,
                                fontSize: 12,
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
                )}
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default DropDownComponent