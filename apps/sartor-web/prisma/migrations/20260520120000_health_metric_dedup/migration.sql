-- Nettoyage avant contraintes
DELETE FROM "HealthMetric" WHERE "userId" IS NULL;

UPDATE "HealthMetric" SET "source" = 'unknown' WHERE "source" IS NULL;

-- Suppression des doublons existants (garde la ligne la plus ancienne)
DELETE FROM "HealthMetric" a
USING "HealthMetric" b
WHERE a.id > b.id
  AND a."userId" = b."userId"
  AND a."type" = b."type"
  AND a."source" = b."source"
  AND a."recordedAt" = b."recordedAt";

ALTER TABLE "HealthMetric" ALTER COLUMN "source" SET NOT NULL;
ALTER TABLE "HealthMetric" ALTER COLUMN "userId" SET NOT NULL;

CREATE UNIQUE INDEX "health_metric_dedup" ON "HealthMetric"("userId", "type", "source", "recordedAt");
CREATE INDEX "HealthMetric_userId_recordedAt_idx" ON "HealthMetric"("userId", "recordedAt");
