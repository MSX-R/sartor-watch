import { useQuery } from "@tanstack/react-query";

import { ensureAuthenticated } from "../../services/auth.service";
import { getHealthMetrics } from "../../services/health.service";

export function useHealthMetrics() {
  return useQuery({
    queryKey: ["health-metrics"],
    queryFn: async () => {
      await ensureAuthenticated();
      return getHealthMetrics();
    },
  });
}
