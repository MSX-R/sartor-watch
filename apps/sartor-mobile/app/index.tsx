import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { useHealthMetrics } from "../src/features/health/use-health-metrics";

export default function HomeScreen() {
  const { data, isLoading, error } = useHealthMetrics();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>API ERROR</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sartor Watch</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.metricType}>{item.type}</Text>

            <Text style={styles.metricValue}>
              {item.value} {item.unit}
            </Text>

            <Text style={styles.metricSource}>{item.source}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,

    backgroundColor: "#0f172a",

    justifyContent: "center",

    alignItems: "center",
  },

  container: {
    flex: 1,

    backgroundColor: "#0f172a",

    paddingTop: 80,

    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",

    fontSize: 32,

    fontWeight: "700",

    marginBottom: 24,
  },

  card: {
    backgroundColor: "#1e293b",

    borderRadius: 16,

    padding: 16,

    marginBottom: 12,
  },

  metricType: {
    color: "#94a3b8",

    fontSize: 14,

    textTransform: "uppercase",
  },

  metricValue: {
    color: "#fff",

    fontSize: 24,

    fontWeight: "700",

    marginTop: 4,
  },

  metricSource: {
    color: "#22c55e",

    marginTop: 6,
  },

  error: {
    color: "#ef4444",

    fontSize: 18,
  },
});
