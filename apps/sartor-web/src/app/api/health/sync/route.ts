import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { HealthProvider } from "@/modules/health/core/enums/health-provider.enum";
import { syncProviderSchema } from "@/modules/health/core/schemas/health-metric.schema";
import { ProviderSyncService } from "@/modules/health/core/services/provider-sync.service";

export async function POST(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const body = await request.json().catch(() => ({}));
  const parsed = syncProviderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const providerSyncService = new ProviderSyncService();
  const result = await providerSyncService.syncProvider(
    userIdOrResponse,
    parsed.data.provider,
  );

  return NextResponse.json({
    success: true,
    ...result,
  });
}
