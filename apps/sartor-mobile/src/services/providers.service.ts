import { api } from "../lib/api";

export type ProviderCatalogItem = {
  id: string;
  name: string;
  description: string;
  isAggregationHub?: boolean;
  aggregatesBrands?: string[];
  platform?: string;
  ingestMode: string;
  connected: boolean;
  lastSyncAt: string | null;
};

export async function getProviderCatalog(): Promise<ProviderCatalogItem[]> {
  const { data } = await api.get("/health/providers");

  return data.providers ?? [];
}

export async function connectProvider(provider: string): Promise<void> {
  await api.post("/health/providers/connect", { provider });
}

export async function disconnectProvider(provider: string): Promise<void> {
  await api.post("/health/providers/disconnect", { provider });
}
