import { Tabs } from "expo-router";

import { theme } from "../../src/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.bg },
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.card, borderTopColor: "#334155" },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.muted,
        sceneStyle: { backgroundColor: theme.bg },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Today", tabBarLabel: "Today" }} />
      <Tabs.Screen name="activity" options={{ title: "Activité" }} />
      <Tabs.Screen name="sleep" options={{ title: "Sommeil" }} />
      <Tabs.Screen name="body" options={{ title: "Corps" }} />
    </Tabs>
  );
}
