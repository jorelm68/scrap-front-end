import { Tabs, Stack } from 'expo-router'

export default () => {
    return (
        <Tabs>
            <Stack.Screen name='feed' options={{ title: 'Feed' }} />
            <Stack.Screen name='search' options={{ title: 'Search' }} />
            <Stack.Screen name='camera' options={{ title: 'Camera' }} />
            <Stack.Screen name='library' options={{ title: 'Library' }} />
            <Stack.Screen name='profile' options={{ title: 'Profile' }} />
        </Tabs>
    )
}