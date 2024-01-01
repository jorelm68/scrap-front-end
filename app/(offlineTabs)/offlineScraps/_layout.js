// /app/(tabs)/camera/_layout.js

import { Stack } from "expo-router";
import { options } from '../../../data/styles'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          ...options,
          headerTitle: 'Scraps',
        }}
      />
      <Stack.Screen
        name='offlineEditScrap'
        options={{
          ...options,
          headerTitle: 'Edit Scrap',
        }}
      />
    </Stack>
  )
}

export default Layout