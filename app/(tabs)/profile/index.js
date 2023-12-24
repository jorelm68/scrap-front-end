// /app/(tabs)/profile/index.js

import { Stack, Redirect } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";
import AppContext from '../../../context/AppContext'

const Page = () => {
  const { user } = useContext(AppContext)

  return (
    <Redirect href={`/profile/author/${user}`} />
  )
}
export default Page