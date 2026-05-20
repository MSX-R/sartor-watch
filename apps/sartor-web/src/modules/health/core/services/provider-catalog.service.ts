import { prisma } from "@/lib/prisma";

import { PROVIDER_CATALOG, ProviderCatalogEntry } from "../config/provider-catalog.config";
import { HealthProvider } from "../enums/health-provider.enum";

export type ProviderCatalogItem = ProviderCatalogEntry & {
  connected: boolean;
  lastSyncAt: string | null;
};

export class ProviderCatalogService {
  async listForUser(userId: string): Promise<ProviderCatalogItem[]> {
    const connections = await prisma.connectedProvider.findMany({
      where: { userId },
      select: { provider: true, lastSyncAt: true },
    });

    const byProvider = new Map(
      connections.map((row) => [row.provider as HealthProvider, row.lastSyncAt]),
    );

    return PROVIDER_CATALOG.map((entry) => ({
      ...entry,
      connected: byProvider.has(entry.id),
      lastSyncAt: byProvider.get(entry.id)?.toISOString() ?? null,
    }));
  }
}
