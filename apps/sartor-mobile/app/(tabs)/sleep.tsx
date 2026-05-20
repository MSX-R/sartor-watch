import { ScrollView, StyleSheet, View } from "react-native";

import { StatRow } from "../../src/components/ui/StatRow";
import { ScreenState } from "../../src/components/ScreenState";
import { theme } from "../../src/constants/theme";
import { useHealthSummary } from "../../src/features/health/use-health-summary";
import { formatNumber, formatSleep } from "../../src/lib/format";

export default function SleepScreen() {
  const { data, isLoading, isError } = useHealthSummary();

  return (
    <ScreenState loading={isLoading} error={isError}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <StatRow label="Durée de sommeil" value={formatSleep(data?.sleepMinutes ?? null)} />
          <StatRow label="FC au repos" value={formatNumber(data?.restingHeartRate ?? null, " bpm")} />
        </View>
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
});
