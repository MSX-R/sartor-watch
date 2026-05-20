import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { healthConnectIngestSchema } from "@/modules/health/core/schemas/health-metric.schema";
import { HealthMetricService } from "@/modules/health/core/services/health-metric.service";
import { HealthProvider } from "@/modules/health/core/enums/health-provider.enum";
import { ProviderConnectionService } from "@/modules/health/core/services/provider-connection.service";
import { HealthConnectMapper } from "@/modules/health/providers/health-connect/health-connect.mapper";

export async function POST(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const body = await request.json();
  const parsed = healthConnectIngestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  await new ProviderConnectionService().ensureConnected(
    userIdOrResponse,
    HealthProvider.HEALTH_CONNECT,
  );

  const metrics = HealthConnectMapper.toIngestMetrics(parsed.data.metrics);

  if (metrics.length === 0) {
    return NextResponse.json(
      { success: false, error: "No supported Health Connect metrics" },
      { status: 400 },
    );
  }

  const upserted = await new HealthMetricService().upsertMetrics(
    metrics.map((metric) => ({ ...metric, userId: userIdOrResponse })),
  );

  return NextResponse.json({ success: true, upserted });
}
