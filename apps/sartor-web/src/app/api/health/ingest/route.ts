import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { ingestMetricsSchema } from "@/modules/health/core/schemas/health-metric.schema";
import { HealthMetricService } from "@/modules/health/core/services/health-metric.service";

export async function POST(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const body = await request.json();
  const parsed = ingestMetricsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const healthMetricService = new HealthMetricService();
  const upserted = await healthMetricService.upsertMetrics(
    parsed.data.metrics.map((metric) => ({
      ...metric,
      userId: userIdOrResponse,
    })),
  );

  return NextResponse.json({
    success: true,
    upserted,
  });
}
