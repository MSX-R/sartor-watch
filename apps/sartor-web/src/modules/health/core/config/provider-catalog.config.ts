import { HealthProvider } from "../enums/health-provider.enum";

export type ProviderCatalogEntry = {
  id: HealthProvider;
  name: string;
  description: string;
  /** Hub Android qui agrège plusieurs marques via une seule connexion */
  isAggregationHub?: boolean;
  /** Marques typiquement accessibles via ce hub (Mi Fitness, Garmin, Fitbit…) */
  aggregatesBrands?: string[];
  platform?: "android" | "ios" | "all";
  ingestMode: "oauth" | "mobile_sdk" | "server_sync" | "unified_api";
};

export const PROVIDER_CATALOG: ProviderCatalogEntry[] = [
  {
    id: HealthProvider.HEALTH_CONNECT,
    name: "Health Connect",
    description:
      "Passerelle Android : Xiaomi, Garmin, Fitbit, Google Fit, Samsung et autres apps synchronisées vers HC.",
    isAggregationHub: true,
    aggregatesBrands: [
      "Xiaomi / Mi Fitness",
      "Garmin Connect",
      "Fitbit",
      "Google Fit",
      "Samsung Health",
      "Polar",
      "Withings",
    ],
    platform: "android",
    ingestMode: "mobile_sdk",
  },
  {
    id: HealthProvider.APPLE,
    name: "Apple Health",
    description: "Apple Watch et apps iOS via HealthKit.",
    platform: "ios",
    ingestMode: "mobile_sdk",
  },
  {
    id: HealthProvider.GOOGLE_FIT,
    name: "Google Fit",
    description: "Historique et apps connectées Google Fit.",
    platform: "android",
    ingestMode: "oauth",
  },
  {
    id: HealthProvider.GARMIN,
    name: "Garmin",
    description: "Montres et capteurs Garmin Connect.",
    platform: "all",
    ingestMode: "oauth",
  },
  {
    id: HealthProvider.FITBIT,
    name: "Fitbit",
    description: "Trackers et montres Fitbit.",
    platform: "all",
    ingestMode: "oauth",
  },
  {
    id: HealthProvider.STRAVA,
    name: "Strava",
    description: "Activités course, vélo, natation.",
    platform: "all",
    ingestMode: "oauth",
  },
  {
    id: HealthProvider.SUUNTO,
    name: "Suunto",
    description: "Montres sport Suunto.",
    platform: "all",
    ingestMode: "oauth",
  },
  {
    id: HealthProvider.XIAOMI,
    name: "Xiaomi / Redmi",
    description: "Mi Fitness, montres Redmi Watch (sync serveur ou via Health Connect).",
    platform: "all",
    ingestMode: "server_sync",
  },
  {
    id: HealthProvider.MYFITNESSPAL,
    name: "MyFitnessPal",
    description: "Nutrition et calories.",
    platform: "all",
    ingestMode: "oauth",
  },
  {
    id: HealthProvider.YAZIO,
    name: "Yazio",
    description: "Nutrition, macros et hydratation.",
    platform: "all",
    ingestMode: "oauth",
  },
];
