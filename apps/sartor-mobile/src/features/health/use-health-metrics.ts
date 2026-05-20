import { useQuery } from "@tanstack/react-query";

import { getHealthMetrics } from "../../services/health.service";

export function useHealthMetrics() {
  return useQuery({
    queryKey: ["health-metrics"],

    queryFn: getHealthMetrics,
  });
}
