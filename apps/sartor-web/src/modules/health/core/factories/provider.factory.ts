import { HealthProvider } from "../enums/health-provider.enum";

import { HealthProviderContract } from "../contracts/health-provider.contract";

import { XiaomiProvider } from "../../providers/xiaomi/xiaomi.provider";

export class ProviderFactory {
  static create(provider: HealthProvider): HealthProviderContract {
    switch (provider) {
      case HealthProvider.XIAOMI:
        return new XiaomiProvider();

      default:
        throw new Error("Unsupported provider");
    }
  }
}
