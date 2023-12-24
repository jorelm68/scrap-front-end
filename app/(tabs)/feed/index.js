// /app/(tabs)/feed/index.js

import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: true, title: "Feed" }} />
      <Text>Index page of Feed Tab</Text>
    </View>
  );
}