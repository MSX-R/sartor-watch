import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "../src/lib/query-client";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0f172a",
          },

          headerTintColor: "#f8fafc",

          contentStyle: {
            backgroundColor: "#0f172a",
          },
        }}
      />
    </QueryClientProvider>
  );
}
