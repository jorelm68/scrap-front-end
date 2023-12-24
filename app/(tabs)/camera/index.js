// /app/(tabs)/camera/index.js

import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: true, title: "Camera" }} />
      <Text>Index page of Camera Tab</Text>
    </View>
  );
}