import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { HealthProvider } from "@/modules/health/core/enums/health-provider.enum";

import { ProviderSyncService } from "@/modules/health/core/services/provider-sync.service";

export async function POST() {
  const user = await prisma.user.findFirst({
    where: {
      email: "test@sartor.app",
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 404,
      },
    );
  }

  const syncService = new ProviderSyncService();

  await syncService.syncProvider(user.id, HealthProvider.XIAOMI);

  return NextResponse.json({
    success: true,
  });
}
