import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../../constants/theme";

type Props = {
  title: string;
  value: string;
  subtitle?: string;
  onPress?: () => void;
};

export function SummaryCard({ title, value, subtitle, onPress }: Props) {
  const content = (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable style={styles.card} onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return <View style={styles.card}>{content}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.muted,
    fontSize: 14,
    textTransform: "uppercase",
  },
  value: {
    color: theme.text,
    fontSize: 36,
    fontWeight: "700",
    marginTop: 8,
  },
  subtitle: {
    color: theme.muted,
    fontSize: 14,
    marginTop: 8,
  },
});
