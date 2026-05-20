import { StyleSheet, Text, View } from "react-native";

import { theme } from "../../constants/theme";
import type { DailyMetricPoint } from "../../services/health-history.service";

type Props = {
  points: DailyMetricPoint[];
  suffix?: string;
};

export function HistoryBars({ points, suffix = "" }: Props) {
  const values = points.map((p) => p.value ?? 0);
  const max = Math.max(...values, 1);

  return (
    <View style={styles.wrap}>
      {points.map((point) => {
        const value = point.value ?? 0;
        const height = Math.max(4, (value / max) * 72);

        return (
          <View key={point.date} style={styles.col}>
            <View style={[styles.bar, { height }]} />
            <Text style={styles.value}>
              {point.value !== null ? `${Math.round(point.value)}${suffix}` : "—"}
            </Text>
            <Text style={styles.day}>{point.date.slice(8, 10)}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: theme.spacing.md,
    minHeight: 100,
  },
  col: { alignItems: "center", flex: 1 },
  bar: {
    width: 14,
    backgroundColor: theme.accent,
    borderRadius: 4,
    marginBottom: 4,
  },
  value: { color: theme.muted, fontSize: 9 },
  day: { color: theme.muted, fontSize: 10, marginTop: 2 },
});
