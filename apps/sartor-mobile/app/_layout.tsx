import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";

import { theme } from "../src/constants/theme";
import { queryClient } from "../src/lib/query-client";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.bg },
          headerTintColor: theme.text,
          contentStyle: { backgroundColor: theme.bg },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ title: "Inscription" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="metrics" options={{ title: "Toutes les métriques" }} />
        <Stack.Screen name="sources" options={{ title: "Sources de données" }} />
        <Stack.Screen name="workouts" options={{ title: "Séances" }} />
      </Stack>
    </QueryClientProvider>
  );
}
