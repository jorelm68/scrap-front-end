import { View, Text, Image } from 'react-native-ui-lib'
import React, { useContext } from 'react'
import useScrap from '../hooks/useScrap'
import { dimensions, colors, styles } from '../data/styles'
import AppContext from '../context/AppContext'
import useAuthor from '../hooks/useAuthor'

const Scrap = ({ scrap }) => {
    const { user } = useContext(AppContext)
    const {
        iPrograph,
        iRetrograph,
        title,
        description,
        place,
        latitude,
        longitude,
        author,
    } = useScrap(scrap, [
        'iPrograph->1080',
        'iRetrograph->1080',
        'title',
        'description',
        'place',
        'latitude',
        'longitude',
        'author',
    ])

    const {
        iHeadshot,
        firstName,
        lastName,
        pseudonym,
    } = useAuthor(author, [
        'iHeadshot->1080',
        'firstName',
        'lastName',
        'pseudonym',
    ])

    return (
        <View style={{
            width: '100%',
            height: '100%',
        }}>
            <View centerV row>
                <Image source={iHeadshot} style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                }} />
                <Text style={{
                    fontFamily: styles.text2,
                    fontSize: 18,
                    paddingLeft: 4,
                }}>{firstName || lastName ? `${firstName}${firstName && lastName ? ' ' : ''}${lastName}` : `${pseudonym}`}</Text>
            </View>

            {title && (
                <View>
                    <Text style={{
                        fontFamily: styles.text1,
                        fontSize: 18,
                    }}>{title}</Text>
                </View>
            )}


            <View center>
                <Image source={iPrograph} style={{
                    width: dimensions.width,
                    height: dimensions.width,
                    borderRadius: 8,
                }} />
                <Image source={iRetrograph} style={{
                    position: 'absolute',
                    width: dimensions.width / 3,
                    height: dimensions.width / 3,
                    top: -48,
                    right: 0,
                    borderRadius: 8,
                }} />
            </View>
        </View>
    )
}

export default Scrap