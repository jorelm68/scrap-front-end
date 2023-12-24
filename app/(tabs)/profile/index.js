// /app/(tabs)/profile/index.js

import { Stack, Redirect } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";
import AppContext from '../../../context/AppContext'

export default function Page() {
  const { user } = useContext(AppContext)
  return <Redirect href={`/profile/profile/${user}`} />;
}