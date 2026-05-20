import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { HealthSummaryService } from "@/modules/health/core/services/health-summary.service";

export async function GET(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const summary = await new HealthSummaryService().getTodaySummary(userIdOrResponse);

  return NextResponse.json(summary);
}
