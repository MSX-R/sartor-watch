import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

import { HistoryBars } from "../../src/components/ui/HistoryBars";
import { StatRow } from "../../src/components/ui/StatRow";
import { ScreenState } from "../../src/components/ScreenState";
import { theme } from "../../src/constants/theme";
import { useHealthHistory } from "../../src/features/health/use-health-history";
import { useHealthSummary } from "../../src/features/health/use-health-summary";
import { useRefreshHealth } from "../../src/hooks/use-refresh-health";
import { formatNumber } from "../../src/lib/format";

export default function ActivityScreen() {
  const { data, isLoading, isError, refetch } = useHealthSummary();
  const stepsHistory = useHealthHistory("steps", 7);
  const { refreshing, onRefresh } = useRefreshHealth();

  return (
    <ScreenState loading={isLoading} error={isError} onRetry={() => refetch()}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.accent} />}
      >
        <View style={styles.card}>
          <StatRow label="Pas" value={formatNumber(data?.steps ?? null)} />
          <StatRow label="Calories actives" value={formatNumber(data?.activeCalories ?? null, " kcal")} />
          <StatRow label="Calories" value={formatNumber(data?.calories ?? null, " kcal")} />
          <StatRow label="Fréquence cardiaque" value={formatNumber(data?.heartRate ?? null, " bpm")} />
        </View>

        <Text style={styles.sectionTitle}>Pas — 7 derniers jours (Paris)</Text>
        <View style={styles.card}>
          {stepsHistory.data ? (
            <HistoryBars points={stepsHistory.data} />
          ) : (
            <Text style={styles.muted}>Chargement…</Text>
          )}
        </View>
      </ScrollView>
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  content: { padding: theme.spacing.lg, paddingBottom: 40 },
  card: {
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: { color: theme.text, fontWeight: "600", marginBottom: 8 },
  muted: { color: theme.muted, padding: theme.spacing.md },
});
