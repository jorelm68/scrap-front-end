// /app/(tabs)/profile/index.js

import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: true, title: "Profile" }} />
      <Text>Index page of Profile Tab</Text>
    </View>
  );
}