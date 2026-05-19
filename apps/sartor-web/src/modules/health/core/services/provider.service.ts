import { prisma } from "@/lib/prisma";

export class ProviderService {
  async connectProvider(userId: string, provider: string) {
    return prisma.connectedProvider.upsert({
      where: {
        userId_provider: {
          userId,
          provider,
        },
      },

      update: {
        lastSyncAt: new Date(),
      },

      create: {
        userId,
        provider,
        lastSyncAt: new Date(),
      },
    });
  }
}
