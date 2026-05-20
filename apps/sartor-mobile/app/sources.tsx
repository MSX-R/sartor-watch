import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenState } from "../src/components/ScreenState";
import { theme } from "../src/constants/theme";
import { getProviderLabel } from "../src/constants/provider-labels";
import {
  useConnectHealthConnect,
  useHealthConnectStatus,
  useOpenHealthConnectSettings,
} from "../src/features/health/use-health-connect";
import { useConnectProvider, useDisconnectProvider } from "../src/features/health/use-provider-actions";
import { useHealthProviders } from "../src/features/health/use-health-providers";

export default function SourcesScreen() {
  const { data, isLoading, isError, refetch } = useHealthProviders();
  const hcStatus = useHealthConnectStatus();
  const connectHc = useConnectHealthConnect();
  const openHc = useOpenHealthConnectSettings();
  const connectProvider = useConnectProvider();
  const disconnectProvider = useDisconnectProvider();

  const onToggle = (id: string, connected: boolean) => {
    if (connected) {
      disconnectProvider.mutate(id);
    } else {
      connectProvider.mutate(id);
    }
  };

  return (
    <ScreenState loading={isLoading} error={isError} onRetry={() => refetch()}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.intro}>
          Liez une source pour autoriser la synchronisation. Health Connect agrège plusieurs marques sur
          Android.
        </Text>

        {Platform.OS === "android" ? (
          <View style={styles.hcBox}>
            <Text style={styles.hcTitle}>Health Connect</Text>
            <Text style={styles.hcDesc}>Statut : {hcStatus.data ?? "…"}</Text>
            <View style={styles.hcActions}>
              <Pressable
                style={styles.hcBtn}
                onPress={() => connectHc.mutate()}
                disabled={connectHc.isPending}
              >
                {connectHc.isPending ? (
                  <ActivityIndicator color={theme.bg} size="small" />
                ) : (
                  <Text style={styles.hcBtnText}>Permissions HC</Text>
                )}
              </Pressable>
              <Pressable style={styles.hcBtnOutline} onPress={() => openHc.mutate()}>
                <Text style={styles.hcBtnOutlineText}>Ouvrir HC</Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        {data?.map((provider) => (
          <View key={provider.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{provider.name}</Text>
              <Text style={[styles.badge, provider.connected ? styles.badgeOn : styles.badgeOff]}>
                {provider.connected ? "Lié" : "Non lié"}
              </Text>
            </View>

            <Text style={styles.desc}>{provider.description}</Text>

            {provider.isAggregationHub && provider.aggregatesBrands?.length ? (
              <Text style={styles.brands}>
                {provider.aggregatesBrands.join(" · ")}
              </Text>
            ) : null}

            <Pressable
              style={styles.toggleBtn}
              onPress={() => onToggle(provider.id, provider.connected)}
              disabled={connectProvider.isPending || disconnectProvider.isPending}
            >
              <Text style={styles.toggleText}>
                {provider.connected ? "Déconnecter" : "Connecter (compte Sartor)"}
              </Text>
            </Pressable>

            <Text style={styles.meta}>
              {getProviderLabel(provider.id)}
              {provider.lastSyncAt
                ? ` · ${new Date(provider.lastSyncAt).toLocaleString("fr-FR")}`
                : ""}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  content: { padding: theme.spacing.lg, paddingBottom: 40 },
  intro: {
    color: theme.muted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  hcBox: {
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  hcTitle: { color: theme.text, fontWeight: "700", fontSize: 16, marginBottom: 6 },
  hcDesc: { color: theme.muted, fontSize: 12, marginBottom: 12 },
  hcActions: { flexDirection: "row", gap: 8 },
  hcBtn: {
    flex: 1,
    backgroundColor: theme.accent,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  hcBtnText: { color: theme.bg, fontWeight: "700", fontSize: 13 },
  hcBtnOutline: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.accent,
    alignItems: "center",
  },
  hcBtnOutlineText: { color: theme.accent, fontWeight: "600", fontSize: 13 },
  card: {
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: { color: theme.text, fontSize: 17, fontWeight: "700", flex: 1 },
  badge: {
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeOn: { backgroundColor: "#14532d", color: "#86efac" },
  badgeOff: { backgroundColor: "#334155", color: theme.muted },
  desc: { color: theme.text, fontSize: 13, lineHeight: 19 },
  brands: { color: theme.accent, fontSize: 12, marginTop: 8, lineHeight: 17 },
  toggleBtn: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.muted,
    alignItems: "center",
  },
  toggleText: { color: theme.text, fontSize: 13, fontWeight: "600" },
  meta: { color: theme.muted, fontSize: 11, marginTop: 8 },
});
