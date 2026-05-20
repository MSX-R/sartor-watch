import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { HealthProvider } from "@/modules/health/core/enums/health-provider.enum";
import { syncProviderSchema } from "@/modules/health/core/schemas/health-metric.schema";
import { ProviderConnectionService } from "@/modules/health/core/services/provider-connection.service";
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

  await new ProviderConnectionService().ensureConnected(
    userIdOrResponse,
    parsed.data.provider,
  );

  const result = await new ProviderSyncService().syncProvider(
    userIdOrResponse,
    parsed.data.provider,
  );

  return NextResponse.json({
    success: true,
    ...result,
  });
}
