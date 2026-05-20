import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

import { HistoryBars } from "../../src/components/ui/HistoryBars";
import { StatRow } from "../../src/components/ui/StatRow";
import { ScreenState } from "../../src/components/ScreenState";
import { theme } from "../../src/constants/theme";
import { useHealthHistory } from "../../src/features/health/use-health-history";
import { useHealthSummary } from "../../src/features/health/use-health-summary";
import { useRefreshHealth } from "../../src/hooks/use-refresh-health";
import { formatNumber, formatSleep } from "../../src/lib/format";

export default function SleepScreen() {
  const { data, isLoading, isError, refetch } = useHealthSummary();
  const sleepHistory = useHealthHistory("sleep", 7);
  const { refreshing, onRefresh } = useRefreshHealth();

  return (
    <ScreenState loading={isLoading} error={isError} onRetry={() => refetch()}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.accent} />}
      >
        <View style={styles.card}>
          <StatRow label="Durée de sommeil" value={formatSleep(data?.sleepMinutes ?? null)} />
          <StatRow label="FC au repos" value={formatNumber(data?.restingHeartRate ?? null, " bpm")} />
        </View>

        <Text style={styles.sectionTitle}>Sommeil — 7 jours (min)</Text>
        <View style={styles.card}>
          {sleepHistory.data ? <HistoryBars points={sleepHistory.data} suffix="m" /> : null}
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
    marginBottom: theme.spacing.md,
  },
  sectionTitle: { color: theme.text, fontWeight: "600", marginBottom: 8 },
});
