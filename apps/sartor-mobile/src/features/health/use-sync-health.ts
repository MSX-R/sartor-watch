import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Platform } from "react-native";

import {
  getHealthConnectAvailability,
  ingestHealthConnectMetrics,
  readHealthConnectMetrics,
} from "../../services/health-connect.service";
import { requireAuth } from "../../services/auth.service";
import { syncXiaomiProvider } from "../../services/sync.service";

export type SyncHealthResult = {
  hcCount: number;
  hcRead: number;
  xiaomiCount: number;
  hcAvailability: string;
  message: string;
};

export function useSyncHealth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<SyncHealthResult> => {
      requireAuth();

      const hcAvailability = await getHealthConnectAvailability();
      let hcRead = 0;
      let hcCount = 0;

      if (Platform.OS === "android" && hcAvailability === "available") {
        const rows = await readHealthConnectMetrics();
        hcRead = rows.length;
        hcCount = await ingestHealthConnectMetrics(rows);
      }

      let xiaomiCount = 0;

      if (__DEV__ && hcCount === 0) {
        xiaomiCount = await syncXiaomiProvider();
      }

      const message =
        hcCount > 0
          ? `${hcCount} métrique(s) Health Connect importée(s)`
          : hcAvailability !== "available"
            ? "Health Connect indisponible — utilisez un dev build Android"
            : hcRead === 0
              ? "Aucune donnée HC aujourd’hui (Paris) — vérifiez Mi Fitness / Garmin → HC"
              : xiaomiCount > 0
                ? `${xiaomiCount} métrique(s) mock Xiaomi (dev)`
                : "Aucune nouvelle donnée";

      return { hcCount, hcRead, xiaomiCount, hcAvailability, message };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["health-summary-today"] });
      await queryClient.invalidateQueries({ queryKey: ["health-metrics"] });
      await queryClient.invalidateQueries({ queryKey: ["health-providers"] });
    },
  });
}
