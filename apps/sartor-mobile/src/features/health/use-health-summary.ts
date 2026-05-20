import { useQuery } from "@tanstack/react-query";

import { ensureAuthenticated } from "../../services/auth.service";
import { getTodaySummary } from "../../services/health-summary.service";

export function useHealthSummary() {
  return useQuery({
    queryKey: ["health-summary-today"],
    queryFn: async () => {
      await ensureAuthenticated();
      return getTodaySummary();
    },
  });
}
