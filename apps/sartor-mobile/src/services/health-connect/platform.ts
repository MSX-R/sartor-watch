import { Platform } from "react-native";

export function isAndroid(): boolean {
  return Platform.OS === "android";
}

export type HealthConnectNative = typeof import("react-native-health-connect");

let cachedModule: HealthConnectNative | null | undefined;

export async function loadHealthConnectModule(): Promise<HealthConnectNative | null> {
  if (!isAndroid()) {
    return null;
  }

  if (cachedModule !== undefined) {
    return cachedModule;
  }

  try {
    cachedModule = await import("react-native-health-connect");
    return cachedModule;
  } catch {
    cachedModule = null;
    return null;
  }
}
