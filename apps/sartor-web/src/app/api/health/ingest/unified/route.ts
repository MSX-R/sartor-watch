import { NextRequest, NextResponse } from "next/server";

import { requireUserId } from "@/lib/auth/request-auth";
import { UnifiedMetricNormalizer } from "@/modules/health/core/normalization/unified-metric-normalizer.service";
import { unifiedIngestSchema } from "@/modules/health/core/schemas/health-metric.schema";
import { HealthMetricService } from "@/modules/health/core/services/health-metric.service";
import { ProviderConnectionService } from "@/modules/health/core/services/provider-connection.service";

/**
 * Ingestion universelle : toute marque / format vendeur → métriques Sartor homogènes.
 */
export async function POST(request: NextRequest) {
  const userIdOrResponse = await requireUserId(request);

  if (userIdOrResponse instanceof NextResponse) {
    return userIdOrResponse;
  }

  const body = await request.json();
  const parsed = unifiedIngestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  await new ProviderConnectionService().ensureConnected(
    userIdOrResponse,
    parsed.data.source,
  );

  const { metrics, skipped, unknownTypes } = new UnifiedMetricNormalizer().normalize(
    parsed.data.source,
    parsed.data.metrics,
  );

  if (metrics.length === 0) {
    return NextResponse.json(
      {
        success: false,
        error: "Aucune métrique reconnue après normalisation",
        skipped,
        unknownTypes,
      },
      { status: 400 },
    );
  }

  const upserted = await new HealthMetricService().upsertMetrics(
    metrics.map((metric) => ({ ...metric, userId: userIdOrResponse })),
  );

  return NextResponse.json({
    success: true,
    upserted,
    skipped,
    unknownTypes,
  });
}
