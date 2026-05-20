import { StyleSheet, Text, View } from "react-native";

import { theme } from "../../constants/theme";

type Props = {
  label: string;
  value: string;
  hint?: string;
};

export function MetricCard({ label, value, hint }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "46%",
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    padding: theme.spacing.md,
  },
  label: {
    color: theme.muted,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    color: theme.text,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
  },
  hint: {
    color: theme.accent,
    fontSize: 12,
    marginTop: 4,
  },
});
