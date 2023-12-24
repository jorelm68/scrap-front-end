// /app/(tabs)/search/index.js

import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: true, title: "Search" }} />
      <Text>Index page of Search Tab</Text>
    </View>
  );
}