import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

import { StatRow } from "../../src/components/ui/StatRow";
import { ScreenState } from "../../src/components/ScreenState";
import { theme } from "../../src/constants/theme";
import { useHealthSummary } from "../../src/features/health/use-health-summary";
import { useRefreshHealth } from "../../src/hooks/use-refresh-health";
import { formatMetricValue } from "../../src/lib/format";

export default function BodyScreen() {
  const { data, isLoading, isError, refetch } = useHealthSummary();
  const { refreshing, onRefresh } = useRefreshHealth();

  const weightLabel =
    data?.weight != null ? formatMetricValue("weight", data.weight, "kg") : "—";

  const fatLabel =
    data?.bodyFat != null ? formatMetricValue("body_fat", data.bodyFat, null) : "—";

  return (
    <ScreenState loading={isLoading} error={isError} onRetry={() => refetch()}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.accent} />}
      >
        <View style={styles.card}>
          <StatRow label="Poids" value={weightLabel} />
          <StatRow label="Masse grasse" value={fatLabel} />
        </View>
        <Text style={styles.hint}>Dernière valeur connue (toutes sources, format unifié).</Text>
      </ScrollView>
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  content: { padding: theme.spacing.lg },
  card: {
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    paddingHorizontal: theme.spacing.md,
  },
  hint: { color: theme.muted, fontSize: 12, marginTop: theme.spacing.md },
});
