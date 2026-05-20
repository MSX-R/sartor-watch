import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { MetricCard } from "../../src/components/ui/MetricCard";
import { SummaryCard } from "../../src/components/ui/SummaryCard";
import { ScreenState } from "../../src/components/ScreenState";
import { theme } from "../../src/constants/theme";
import { useHealthSummary } from "../../src/features/health/use-health-summary";
import { formatNumber, formatSleep } from "../../src/lib/format";

export default function TodayScreen() {
  const { data, isLoading, isError } = useHealthSummary();

  return (
    <ScreenState loading={isLoading} error={isError}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Sartor Watch</Text>

        <SummaryCard
          title="Pas aujourd'hui"
          value={formatNumber(data?.steps ?? null)}
          subtitle="Résumé du jour"
          onPress={() => router.push("/metrics")}
        />

        <View style={styles.grid}>
          <MetricCard label="Sommeil" value={formatSleep(data?.sleepMinutes ?? null)} />
          <MetricCard
            label="Calories"
            value={formatNumber(data?.activeCalories ?? data?.calories ?? null, " kcal")}
          />
          <MetricCard label="FC repos" value={formatNumber(data?.restingHeartRate ?? null, " bpm")} />
          <MetricCard label="FC" value={formatNumber(data?.heartRate ?? null, " bpm")} />
        </View>
      </ScrollView>
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  content: { padding: theme.spacing.lg, paddingBottom: 40 },
  greeting: {
    color: theme.text,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: theme.spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
});
