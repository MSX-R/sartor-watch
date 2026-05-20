import { router } from "expo-router";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MetricCard } from "../../src/components/ui/MetricCard";
import { SummaryCard } from "../../src/components/ui/SummaryCard";
import { ScreenState } from "../../src/components/ScreenState";
import { theme } from "../../src/constants/theme";
import { useHealthConnectStatus } from "../../src/features/health/use-health-connect";
import { useHealthSummary } from "../../src/features/health/use-health-summary";
import { useSyncHealth } from "../../src/features/health/use-sync-health";
import { useRefreshHealth } from "../../src/hooks/use-refresh-health";
import { formatNumber, formatSleep } from "../../src/lib/format";
import { logout } from "../../src/services/auth.service";
import { useAuthStore } from "../../src/store/auth.store";

const HC_STATUS_LABEL: Record<string, string> = {
  available: "Health Connect prêt",
  unavailable_platform: "HC : iOS / Expo Go non supporté",
  unavailable_sdk: "HC : dev build Android requis",
  unavailable_provider: "HC : installer / mettre à jour l’app Health Connect",
};

export default function TodayScreen() {
  const email = useAuthStore((state) => state.email);
  const { data, isLoading, isError, refetch } = useHealthSummary();
  const sync = useSyncHealth();
  const hcStatus = useHealthConnectStatus();
  const { refreshing, onRefresh } = useRefreshHealth();

  const onLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <ScreenState loading={isLoading} error={isError} onRetry={() => refetch()}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.accent} />
        }
      >
        <View style={styles.headerRow}>
          <Text style={styles.greeting}>Sartor Watch</Text>
          <Pressable onPress={onLogout}>
            <Text style={styles.logoutLink}>Déconnexion</Text>
          </Pressable>
        </View>
        {email ? <Text style={styles.email}>{email}</Text> : null}

        {Platform.OS === "android" && hcStatus.data ? (
          <Text style={styles.hcStatus}>{HC_STATUS_LABEL[hcStatus.data] ?? hcStatus.data}</Text>
        ) : null}

        <Pressable
          style={[styles.syncBtn, sync.isPending && styles.syncBtnDisabled]}
          onPress={() => sync.mutate()}
          disabled={sync.isPending}
        >
          {sync.isPending ? (
            <ActivityIndicator color={theme.bg} />
          ) : (
            <Text style={styles.syncText}>Synchroniser (Health Connect)</Text>
          )}
        </Pressable>

        {sync.isError ? (
          <Text style={styles.syncError}>
            {(sync.error as Error)?.message ?? "Erreur de synchronisation"}
          </Text>
        ) : null}

        {sync.isSuccess ? <Text style={styles.syncOk}>{sync.data.message}</Text> : null}

        <Pressable style={styles.sourcesLink} onPress={() => router.push("/sources")}>
          <Text style={styles.sourcesLinkText}>Sources & montres connectées →</Text>
        </Pressable>
        <Pressable style={styles.sourcesLink} onPress={() => router.push("/workouts")}>
          <Text style={styles.sourcesLinkText}>Séances sport →</Text>
        </Pressable>

        <SummaryCard
          title="Pas aujourd'hui"
          value={formatNumber(data?.steps ?? null)}
          subtitle="Paris · toutes marques → format Sartor"
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

        <Text style={styles.hint}>
          Sur Android : autorisez Sartor dans Health Connect, puis synchronisez. Mi Fitness, Garmin,
          Fitbit, Google Fit… passent par HC et sont convertis automatiquement.
        </Text>
      </ScrollView>
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  content: { padding: theme.spacing.lg, paddingBottom: 40 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  greeting: {
    color: theme.text,
    fontSize: 28,
    fontWeight: "700",
  },
  logoutLink: { color: theme.muted, fontSize: 13 },
  email: { color: theme.muted, fontSize: 13, marginBottom: theme.spacing.sm },
  hcStatus: { color: theme.accent, fontSize: 12, marginBottom: theme.spacing.sm },
  syncBtn: {
    backgroundColor: theme.accent,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  syncBtnDisabled: { opacity: 0.7 },
  syncText: { color: theme.bg, fontWeight: "700" },
  syncOk: { color: theme.accent, marginBottom: theme.spacing.md, fontSize: 13 },
  syncError: { color: theme.error, marginBottom: theme.spacing.md, fontSize: 13 },
  sourcesLink: { marginBottom: theme.spacing.md },
  sourcesLinkText: { color: theme.accent, fontSize: 14, fontWeight: "600" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  hint: {
    color: theme.muted,
    fontSize: 12,
    marginTop: theme.spacing.lg,
    lineHeight: 18,
  },
});
