import { useQuery } from "@tanstack/react-query";

import { requireAuth } from "../../services/auth.service";
import { getProviderCatalog } from "../../services/providers.service";
import { useAuthStore } from "../../store/auth.store";

export function useHealthProviders() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["health-providers"],
    enabled: Boolean(token),
    queryFn: async () => {
      requireAuth();
      return getProviderCatalog();
    },
  });
}
