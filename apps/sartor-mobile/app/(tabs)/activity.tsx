import { ScrollView, StyleSheet, View } from "react-native";

import { StatRow } from "../../src/components/ui/StatRow";
import { ScreenState } from "../../src/components/ScreenState";
import { theme } from "../../src/constants/theme";
import { useHealthSummary } from "../../src/features/health/use-health-summary";
import { formatNumber } from "../../src/lib/format";

export default function ActivityScreen() {
  const { data, isLoading, isError } = useHealthSummary();

  return (
    <ScreenState loading={isLoading} error={isError}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <StatRow label="Pas" value={formatNumber(data?.steps ?? null)} />
          <StatRow label="Calories actives" value={formatNumber(data?.activeCalories ?? null, " kcal")} />
          <StatRow label="Calories" value={formatNumber(data?.calories ?? null, " kcal")} />
          <StatRow label="Fréquence cardiaque" value={formatNumber(data?.heartRate ?? null, " bpm")} />
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
