import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../constants/theme";

type Props = {
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  children: ReactNode;
};

export function ScreenState({ loading, error, onRetry, children }: Props) {
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Impossible de charger les données</Text>
        <Text style={styles.hint}>Vérifiez l’API (EXPO_PUBLIC_API_URL) et le Wi‑Fi.</Text>
        {onRetry ? (
          <Pressable style={styles.retryBtn} onPress={onRetry}>
            <Text style={styles.retryText}>Réessayer</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: theme.bg,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  error: {
    color: theme.error,
    fontSize: 16,
    textAlign: "center",
  },
  hint: {
    color: theme.muted,
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },
  retryBtn: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  retryText: { color: theme.accent, fontWeight: "600" },
});
