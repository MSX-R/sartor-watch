import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { ScreenState } from "../src/components/ScreenState";
import { theme } from "../src/constants/theme";
import { useHealthMetrics } from "../src/features/health/use-health-metrics";

export default function MetricsScreen() {
  const { data, isLoading, isError } = useHealthMetrics();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>API ERROR</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.value}>
            {item.value} {item.unit}
          </Text>
          <Text style={styles.source}>{item.source}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: theme.bg },
  content: { padding: theme.spacing.lg },
  center: {
    flex: 1,
    backgroundColor: theme.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  type: { color: theme.muted, fontSize: 12, textTransform: "uppercase" },
  value: { color: theme.text, fontSize: 22, fontWeight: "700", marginTop: 4 },
  source: { color: theme.accent, marginTop: 6 },
  error: { color: theme.error, fontSize: 16 },
});
