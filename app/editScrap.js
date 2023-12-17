import { View, Text } from 'react-native-ui-lib'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import DropDownComponent from '../components/DropDownComponent'
import useScrap from '../hooks/useScrap'
import { errorScrapDescription, errorScrapPlace, errorScrapTitle } from '../data/error'
import { regexScrapDescription, regexScrapPlace, regexScrapTitle } from '../data/regex'
import { edit } from '../data/utility'
import cache from '../data/cache'

const EditScrap = () => {
    const { scrap } = useLocalSearchParams()
    const {
        title,
        setTitle,
        description,
        setDescription,
        place,
        setPlace,
        threads,
        setThreads,
    } = useScrap(scrap, [
        'title',
        'description',
        'place',
        'threads',
    ])

    return (
        <View>
            <DropDownComponent
                type='Text'
                title='Title:'
                value={title}
                boxes={[
                    {
                        placeholder: 'New Title',
                        regex: regexScrapTitle,
                        error: errorScrapTitle,
                        autoCorrect: true,
                        autoCapitalize: 'words',
                    }
                ]}
                onSubmit={async (values) => {
                    const response = await edit('Scrap', scrap, 'title', values[0])
                    if (response.success) {
                        cache.filter([scrap, 'title'])
                        setTitle(values[0])
                    }
                    return response
                }}
            />
            <DropDownComponent
                type='Text'
                title='Description:'
                value={description}
                boxes={[
                    {
                        placeholder: 'New Description',
                        regex: regexScrapDescription,
                        error: errorScrapDescription,
                        autoCorrect: true,
                        autoCapitalize: 'sentences',
                    }
                ]}
                onSubmit={async (values) => {
                    const response = await edit('Scrap', scrap, 'description', values[0])
                    if (response.success) {
                        cache.filter([scrap, 'description'])
                        setDescription(values[0])
                    }
                    return response
                }}
            />
            <DropDownComponent
                type='Text'
                title='Place:'
                value={place}
                boxes={[
                    {
                        placeholder: 'New Place',
                        regex: regexScrapPlace,
                        error: errorScrapPlace,
                        autoCorrect: true,
                        autoCapitalize: 'words',
                    }
                ]}
                onSubmit={async (values) => {
                    const response = await edit('Scrap', scrap, 'place', values[0])
                    if (response.success) {
                        cache.filter([scrap, 'place'])
                        setPlace(values[0])
                    }
                    return response
                }}
            />
        </View>
    )
}

export default EditScrap