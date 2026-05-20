import { StyleSheet, Text, View } from "react-native";

import { theme } from "../../constants/theme";

type Props = {
  label: string;
  value: string;
};

export function StatRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#334155",
  },
  label: {
    color: theme.muted,
    fontSize: 15,
  },
  value: {
    color: theme.text,
    fontSize: 15,
    fontWeight: "600",
  },
});
