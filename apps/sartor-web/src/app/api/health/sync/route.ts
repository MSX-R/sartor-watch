import { NextResponse } from "next/server";

import { ProviderSyncService } from "@/modules/health/core/services/provider-sync.service";

import { HealthProvider } from "@/modules/health/core/enums/health-provider.enum";

export async function POST() {
  const providerSyncService = new ProviderSyncService();

  await providerSyncService.syncProvider("cmpcxyiz70001v18crclg3gns", HealthProvider.XIAOMI);

  return NextResponse.json({
    success: true,
  });
}
