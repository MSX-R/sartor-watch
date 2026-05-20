import { useQuery } from "@tanstack/react-query";

import { requireAuth } from "../../services/auth.service";
import { getHealthMetrics } from "../../services/health.service";
import { useAuthStore } from "../../store/auth.store";

export function useHealthMetrics() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["health-metrics"],
    enabled: Boolean(token),
    queryFn: async () => {
      requireAuth();
      return getHealthMetrics();
    },
  });
}
