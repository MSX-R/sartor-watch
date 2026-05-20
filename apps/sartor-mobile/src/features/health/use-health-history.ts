import { useQuery } from "@tanstack/react-query";

import { requireAuth } from "../../services/auth.service";
import { getMetricHistory } from "../../services/health-history.service";
import { useAuthStore } from "../../store/auth.store";

export function useHealthHistory(type: string, days = 7) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["health-history", type, days],
    enabled: Boolean(token),
    queryFn: async () => {
      requireAuth();
      return getMetricHistory(type, days);
    },
  });
}
