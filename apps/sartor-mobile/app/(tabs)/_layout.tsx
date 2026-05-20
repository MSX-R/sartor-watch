import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { theme } from "../../src/constants/theme";
import { useAuthHydration } from "../../src/hooks/use-auth-hydration";
import { useAuthStore } from "../../src/store/auth.store";

export default function TabLayout() {
  const hydrated = useAuthHydration();
  const token = useAuthStore((state) => state.token);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.bg }}>
        <ActivityIndicator color={theme.accent} />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

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
