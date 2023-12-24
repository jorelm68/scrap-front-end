// /app/(tabs)/library/index.js

import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: true, title: "Library" }} />
      <Text>Index page of Library Tab</Text>
    </View>
  );
}