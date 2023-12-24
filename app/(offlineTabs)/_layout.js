import { Tabs } from "expo-router";

export default function OfflineTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="offlineCamera"
        options={{
          tabBarLabel: "Camera",
          title: "Camera"
        }}
      />
      <Tabs.Screen
        name="offlineScraps"
        options={{
          tabBarLabel: "Scraps",
          title: "Scraps"
        }}
      />
    </Tabs>
  );
}