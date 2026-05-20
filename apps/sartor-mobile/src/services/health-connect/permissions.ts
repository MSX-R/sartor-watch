import type { Permission } from "react-native-health-connect";

import { loadHealthConnectModule } from "./platform";

export const HC_READ_PERMISSIONS: Permission[] = [
  { accessType: "read", recordType: "Steps" },
  { accessType: "read", recordType: "ActiveCaloriesBurned" },
  { accessType: "read", recordType: "TotalCaloriesBurned" },
  { accessType: "read", recordType: "HeartRate" },
  { accessType: "read", recordType: "RestingHeartRate" },
  { accessType: "read", recordType: "SleepSession" },
  { accessType: "read", recordType: "Distance" },
  { accessType: "read", recordType: "Weight" },
  { accessType: "read", recordType: "BodyFat" },
  { accessType: "read", recordType: "Vo2Max" },
];

export async function ensureHealthConnectReady(): Promise<{
  ok: boolean;
  reason?: string;
}> {
  const hc = await loadHealthConnectModule();

  if (!hc) {
    return { ok: false, reason: "Module Health Connect indisponible (dev build Android requis)" };
  }

  const status = await hc.getSdkStatus();

  if (status === hc.SdkAvailabilityStatus.SDK_UNAVAILABLE) {
    return { ok: false, reason: "Health Connect non installé sur cet appareil" };
  }

  if (status === hc.SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED) {
    return { ok: false, reason: "Mise à jour Health Connect requise (Play Store)" };
  }

  const initialized = await hc.initialize();

  if (!initialized) {
    return { ok: false, reason: "Impossible d'initialiser Health Connect" };
  }

  return { ok: true };
}

export async function requestHealthConnectPermissions(): Promise<boolean> {
  const ready = await ensureHealthConnectReady();

  if (!ready.ok) {
    throw new Error(ready.reason);
  }

  const hc = await loadHealthConnectModule();

  if (!hc) {
    return false;
  }

  const granted = await hc.requestPermission(HC_READ_PERMISSIONS);

  return granted.length > 0;
}
