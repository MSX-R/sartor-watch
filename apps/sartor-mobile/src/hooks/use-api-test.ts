import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";

export function useApiTest() {
  return useQuery({
    queryKey: ["api-test"],

    queryFn: async () => {
      const response = await api.get("/health/ping");

      return response.data;
    },
  });
}
