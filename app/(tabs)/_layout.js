import { Tabs, Stack } from 'expo-router'

export default () => {
    return (
        <Tabs>
            <Stack.Screen name='feed' />
            <Stack.Screen name='search' />
            <Stack.Screen name='camera' />
            <Stack.Screen name='library' />
            <Stack.Screen name='profile' />
        </Tabs>
    )
}