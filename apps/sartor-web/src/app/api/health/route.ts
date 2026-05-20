import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { HealthProvider } from "@/modules/health/core/enums/health-provider.enum";
import { ProviderSyncService } from "@/modules/health/core/services/provider-sync.service";

/** @deprecated Préférer POST /api/health/sync */
export async function POST(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const result = await new ProviderSyncService().syncProvider(
    userIdOrResponse,
    HealthProvider.XIAOMI,
  );

  return NextResponse.json({ success: true, ...result });
}
