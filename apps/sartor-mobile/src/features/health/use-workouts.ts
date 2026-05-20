import { useQuery } from "@tanstack/react-query";

import { requireAuth } from "../../services/auth.service";
import { getWorkouts } from "../../services/workouts.service";
import { useAuthStore } from "../../store/auth.store";

export function useWorkouts() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["workouts"],
    enabled: Boolean(token),
    queryFn: async () => {
      requireAuth();
      return getWorkouts();
    },
  });
}
