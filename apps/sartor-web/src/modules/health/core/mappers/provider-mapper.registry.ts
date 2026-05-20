import { HealthProvider } from "../enums/health-provider.enum";
import { HealthRecord } from "../types/health-metric.types";
import { XiaomiMapper } from "../../providers/xiaomi/xiaomi.mapper";
import { XiaomiActivityResponse } from "../../providers/xiaomi/xiaomi.types";

type ProviderMapper = (raw: unknown) => HealthRecord;

const mappers: Partial<Record<HealthProvider, ProviderMapper>> = {
  [HealthProvider.XIAOMI]: (raw) =>
    XiaomiMapper.toHealthRecord(raw as XiaomiActivityResponse),
};

export function mapProviderToHealthRecord(
  provider: HealthProvider,
  raw: unknown,
): HealthRecord {
  const mapper = mappers[provider];

  if (!mapper) {
    throw new Error(`Mapper not implemented for provider: ${provider}`);
  }

  return mapper(raw);
}
