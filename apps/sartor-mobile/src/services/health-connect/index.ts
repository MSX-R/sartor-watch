import { Platform } from "react-native";

import type { UnifiedRawMetric } from "../unified-ingest.service";
import { ensureHealthConnectReady, requestHealthConnectPermissions } from "./permissions";
import { loadHealthConnectModule } from "./platform";
import { readTodayHealthConnectMetrics } from "./reader";
import type { HealthConnectAvailability } from "./types";

export type { HealthConnectAvailability };

export async function getHealthConnectAvailability(): Promise<HealthConnectAvailability> {
  if (Platform.OS !== "android") {
    return "unavailable_platform";
  }

  const hc = await loadHealthConnectModule();

  if (!hc) {
    return "unavailable_sdk";
  }

  const status = await hc.getSdkStatus();

  if (status !== hc.SdkAvailabilityStatus.SDK_AVAILABLE) {
    return "unavailable_provider";
  }

  return "available";
}

export async function connectHealthConnectPermissions(): Promise<void> {
  const granted = await requestHealthConnectPermissions();

  if (!granted) {
    throw new Error("Autorisations Health Connect refusées");
  }
}

export async function openHealthConnectSettings(): Promise<void> {
  const hc = await loadHealthConnectModule();

  hc?.openHealthConnectSettings();
}

export async function syncHealthConnectToday(): Promise<{
  metrics: UnifiedRawMetric[];
  availability: HealthConnectAvailability;
}> {
  const availability = await getHealthConnectAvailability();

  if (availability !== "available") {
    return { metrics: [], availability };
  }

  const ready = await ensureHealthConnectReady();

  if (!ready.ok) {
    throw new Error(ready.reason);
  }

  const hc = await loadHealthConnectModule();
  const granted = (await hc?.getGrantedPermissions()) ?? [];

  if (granted.length === 0) {
    const ok = await requestHealthConnectPermissions();

    if (!ok) {
      throw new Error("Autorisations Health Connect requises pour synchroniser");
    }
  }

  const metrics = await readTodayHealthConnectMetrics();

  return { metrics, availability };
}
