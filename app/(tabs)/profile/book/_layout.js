import { Stack } from "expo-router";
import { options } from '../../../../data/styles'

export default function BookLayout() {
    return (
        <Stack>
            <Stack.Screen
                name='likes'
                options={{
                    ...options,
                    headerTitle: 'Likes',
                }}
            />
            <Stack.Screen
                name='editBook'
                options={{
                    ...options,
                    presentation: 'modal',
                    headerTitle: 'Edit Book',
                }}
            />
            <Stack.Screen
                name='editScrap'
                options={{
                    ...options,
                    presentation: 'modal',
                    headerTitle: 'Edit Scrap',
                }}
            />
            <Stack.Screen
                name='chooseScraps'
                options={{
                    ...options,
                    presentation: 'modal',
                    headerTitle: 'Choose Scraps',
                }}
            />
            <Stack.Screen
                name='findBooks'
                options={{
                    ...options,
                    presentation: 'modal',
                    headerTitle: 'Find Books',
                }}
            />
            <Stack.Screen
                name='[book]'
                options={{
                    ...options,
                    headerTitle: 'Book',
                }}
            />
        </Stack>
    )
}