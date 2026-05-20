import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export function useRefreshHealth() {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["health-summary-today"] }),
        queryClient.invalidateQueries({ queryKey: ["health-metrics"] }),
        queryClient.invalidateQueries({ queryKey: ["health-history"] }),
        queryClient.invalidateQueries({ queryKey: ["health-providers"] }),
        queryClient.invalidateQueries({ queryKey: ["workouts"] }),
      ]);
    } finally {
      setRefreshing(false);
    }
  }, [queryClient]);

  return { refreshing, onRefresh };
}
