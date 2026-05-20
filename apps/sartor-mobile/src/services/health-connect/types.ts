export type HealthConnectAvailability =
  | "unavailable_platform"
  | "unavailable_sdk"
  | "unavailable_provider"
  | "available";

export type HealthConnectSyncResult = {
  metrics: import("../unified-ingest.service").UnifiedRawMetric[];
  availability: HealthConnectAvailability;
  permissionsGranted: boolean;
};
