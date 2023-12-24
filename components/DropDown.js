import React, { useContext, useEffect, useState, useRef } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Keyboard } from 'react-native'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { View, Text, Image } from 'react-native-ui-lib'
import MapView, { Polyline, Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'
import useBook from '../hooks/useBook'
import useScrap from '../hooks/useScrap'
import { dimensions, fonts } from '../data/styles'
import cache from '../data/cache'
import api from '../data/api'
import utility from '../data/utility'
import Error from './Error'
import Field from './Field'
import { defaultImage, defaultHeadshot } from '../data/icons'

const Page = ({ title, value, onSubmit, topBorder, type, boxes }) => {
    const { palette } = useContext(AppContext)
    const [isDropped, setIsDropped] = useState(false)
    const [values, setValues] = useState([])
    const [submissions, setSubmissions] = useState([])
    const [error, setError] = useState('')

    const {
        iPrograph,
        iRetrograph,
    } = useScrap(type === 'Scrap' ? value : undefined, [
        'iPrograph->270',
        'iRetrograph->90',
    ])

    useEffect(() => {
        let newValues = []
        let newSubmissions = []
        boxes && boxes.forEach((box) => {
            if (box.initial) {
                newValues.push(box.initial)
            }
            else {
                newValues.push('')
            }
            newSubmissions.push(false)
        })

        setSubmissions(newSubmissions)
        setValues(newValues)
    }, [value])

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
                boxes && boxes.forEach((box) => {
                    if (box.initial) {
                        newValues.push(box.initial)
                    }
                    else {
                        newValues.push('')
                    }
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
            Keyboard.dismiss()
        }}>
            <View>
                {type === 'Scrap' && (
                    <View centerV style={{
                        minHeight: 48,
                        borderBottomWidth: 1,
                        borderTopWidth: topBorder ? 1 : 0,
                        borderColor: palette.color5,
                    }}>
                        <View row center style={{
                        }}>
                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 12, width: '30%',
                                paddingLeft: 4,
                                color: palette.color5,
                            }}>{title}</Text>

                            <View style={{
                                width: '62.5%',
                            }}>
                                {iPrograph !== defaultImage && (
                                    <Image source={iPrograph} style={{
                                        width: '100%',
                                        aspectRatio: 3,
                                        borderRadius: 8,
                                    }} />
                                )}

                                {iRetrograph !== defaultHeadshot && (
                                    <Image source={iRetrograph} style={{
                                        position: 'absolute',
                                        width: `${(1 / 3) / 2 * 100}%`,
                                        aspectRatio: 1,
                                        borderRadius: 100,
                                        bottom: 0,
                                    }} />
                                )}
                            </View>

                            <View center style={{
                                width: '7.5%',
                                height: 48,
                            }}>
                                <Ionicons color={palette.color6} name='pencil' size={24} />
                            </View>
                        </View>
                    </View>
                )}
                {type === 'Text' && (
                    <View centerV style={{
                        minHeight: 48,
                        borderBottomWidth: 1,
                        borderTopWidth: topBorder ? 1 : 0,
                        borderColor: palette.color5,
                    }}>
                        <View row center style={{
                        }}>
                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                width: '30%',
                                paddingLeft: 4,
                                color: palette.color5,
                            }}>{title}</Text>
                            <Text style={{
                                fontFamily: fonts.itim,
                                fontSize: 12,
                                width: '62.5%',
                                color: palette.color5,
                            }}>{value}</Text>

                            <TouchableOpacity center style={{
                                width: '7.5%',
                                height: 48,
                            }} onPress={() => {
                                setIsDropped(!isDropped)
                            }}>
                                <Ionicons style={{
                                }} name={isDropped ? 'chevron-down' : 'chevron-forward'} color={palette.color6} size={24} />
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
                                                <Field
                                                    placeholder={box.placeholder}
                                                    autoCapitalize={box.autoCapitalize}
                                                    autoCorrect={box.autoCorrect}
                                                    autoComplete={box.autoComplete}
                                                    secureTextEntry={box.secureTextEntry}
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
                                                        <Ionicons color={palette.color6} name='checkmark-circle' size={24} />
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                            {boxes && submissions[index] && !box.regex.test(values[index]) && (
                                                <Error error={box.error} />
                                            )}
                                        </View>
                                    )
                                })}
                                <Error error={error} />
                            </View>
                        )}
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Page