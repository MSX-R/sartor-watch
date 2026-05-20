import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { HealthQueryService } from "@/modules/health/core/services/health-query.service";

export async function GET(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const healthQueryService = new HealthQueryService();
  const metrics = await healthQueryService.getLatestMetrics(userIdOrResponse);

  return NextResponse.json(metrics);
}
