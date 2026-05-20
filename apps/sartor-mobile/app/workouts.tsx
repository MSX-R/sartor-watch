import { FlatList, StyleSheet, Text, View } from "react-native";

import { ScreenState } from "../src/components/ScreenState";
import { theme } from "../src/constants/theme";
import { getProviderLabel } from "../src/constants/provider-labels";
import { useWorkouts } from "../src/features/health/use-workouts";

export default function WorkoutsScreen() {
  const { data, isLoading, isError, refetch } = useWorkouts();

  return (
    <ScreenState loading={isLoading} error={isError} onRetry={() => refetch()}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.content}
        data={data}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Aucune séance. Synchronisez Xiaomi (dev) ou importez via Health Connect (à venir).
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title ?? item.type}</Text>
            <Text style={styles.meta}>
              {getProviderLabel(item.source)} · {Math.round(item.duration / 60)} min
            </Text>
            {item.calories ? (
              <Text style={styles.detail}>{Math.round(item.calories)} kcal</Text>
            ) : null}
            <Text style={styles.date}>
              {new Date(item.startedAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
            </Text>
          </View>
        )}
      />
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: theme.bg },
  content: { padding: theme.spacing.lg },
  empty: { color: theme.muted, textAlign: "center", marginTop: 40 },
  card: {
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  title: { color: theme.text, fontSize: 17, fontWeight: "700" },
  meta: { color: theme.accent, marginTop: 4, fontSize: 13 },
  detail: { color: theme.text, marginTop: 4 },
  date: { color: theme.muted, fontSize: 11, marginTop: 6 },
});
