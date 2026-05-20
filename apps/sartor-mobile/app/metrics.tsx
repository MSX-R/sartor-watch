import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { theme } from "../src/constants/theme";
import { getMetricLabel } from "../src/constants/metric-labels";
import { getProviderLabel } from "../src/constants/provider-labels";
import { useHealthMetrics } from "../src/features/health/use-health-metrics";
import { formatMetricValue } from "../src/lib/format";

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
        <Text style={styles.error}>Impossible de charger les métriques</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.header}>
          Format unifié — chaque source est convertie avant affichage.
        </Text>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.type}>{getMetricLabel(item.type)}</Text>
          <Text style={styles.value}>{formatMetricValue(item.type, item.value, item.unit)}</Text>
          <Text style={styles.source}>{getProviderLabel(item.source)}</Text>
          <Text style={styles.date}>
            {new Date(item.recordedAt).toLocaleString("fr-FR", {
              timeZone: "Europe/Paris",
            })}
          </Text>
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
  header: {
    color: theme.muted,
    fontSize: 13,
    marginBottom: theme.spacing.md,
    lineHeight: 18,
  },
  card: {
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  type: { color: theme.muted, fontSize: 12, textTransform: "uppercase" },
  value: { color: theme.text, fontSize: 22, fontWeight: "700", marginTop: 4 },
  source: { color: theme.accent, marginTop: 6, fontSize: 13 },
  date: { color: theme.muted, marginTop: 4, fontSize: 11 },
  error: { color: theme.error, fontSize: 16 },
});
