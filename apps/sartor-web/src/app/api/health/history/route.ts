import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { HealthMetricType } from "@/modules/health/core/enums/health-metric-type.enum";
import { healthHistoryQuerySchema } from "@/modules/health/core/schemas/health-metric.schema";
import { HealthHistoryService } from "@/modules/health/core/services/health-history.service";

export async function GET(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = healthHistoryQuerySchema.safeParse(params);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const history = await new HealthHistoryService().getDailyHistory(
    userIdOrResponse,
    parsed.data.type as HealthMetricType,
    parsed.data.days,
  );

  return NextResponse.json({ success: true, type: parsed.data.type, history });
}
