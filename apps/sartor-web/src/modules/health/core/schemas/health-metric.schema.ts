import { z } from "zod";

import { HealthMetricType } from "../enums/health-metric-type.enum";
import { HealthProvider } from "../enums/health-provider.enum";

const healthMetricTypeSchema = z.nativeEnum(HealthMetricType);
const healthProviderSchema = z.nativeEnum(HealthProvider);

export const ingestMetricItemSchema = z.object({
  type: healthMetricTypeSchema,
  value: z.number().finite(),
  source: healthProviderSchema,
  recordedAt: z.coerce.date(),
  deviceId: z.string().optional(),
});

export const ingestMetricsSchema = z.object({
  metrics: z.array(ingestMetricItemSchema).min(1).max(500),
});

export type IngestMetricItem = z.infer<typeof ingestMetricItemSchema>;
export type IngestMetricsPayload = z.infer<typeof ingestMetricsSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).optional(),
});

export const syncProviderSchema = z.object({
  provider: healthProviderSchema,
});
