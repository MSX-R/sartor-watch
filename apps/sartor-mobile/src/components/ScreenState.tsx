import type { ReactNode } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { theme } from "../constants/theme";

type Props = {
  loading?: boolean;
  error?: boolean;
  children: ReactNode;
};

export function ScreenState({ loading, error, children }: Props) {
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
});
