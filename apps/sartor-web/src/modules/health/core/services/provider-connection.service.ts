import { prisma } from "@/lib/prisma";

import { HealthProvider } from "../enums/health-provider.enum";

export class ProviderConnectionService {
  async connect(userId: string, provider: HealthProvider): Promise<void> {
    await prisma.connectedProvider.upsert({
      where: {
        userId_provider: { userId, provider },
      },
      create: {
        userId,
        provider,
        accessToken: "mock_access_token",
        refreshToken: "mock_refresh_token",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        lastSyncAt: new Date(),
      },
      update: {
        lastSyncAt: new Date(),
      },
    });
  }

  async disconnect(userId: string, provider: HealthProvider): Promise<void> {
    await prisma.connectedProvider.deleteMany({
      where: { userId, provider },
    });
  }

  async ensureConnected(userId: string, provider: HealthProvider): Promise<void> {
    await this.connect(userId, provider);
  }
}
