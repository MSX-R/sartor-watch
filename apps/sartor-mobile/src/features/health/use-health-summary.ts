import { useQuery } from "@tanstack/react-query";

import { requireAuth } from "../../services/auth.service";
import { getTodaySummary } from "../../services/health-summary.service";
import { useAuthStore } from "../../store/auth.store";

export function useHealthSummary() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["health-summary-today"],
    enabled: Boolean(token),
    queryFn: async () => {
      requireAuth();
      return getTodaySummary();
    },
  });
}
