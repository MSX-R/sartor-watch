import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";

import { theme } from "../src/constants/theme";
import { useAuthHydration } from "../src/hooks/use-auth-hydration";
import { useAuthStore } from "../src/store/auth.store";

export default function Index() {
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

  return <Redirect href="/(tabs)" />;
}
