import { useMutation, useQueryClient } from "@tanstack/react-query";

import { connectProvider, disconnectProvider } from "../../services/providers.service";

export function useConnectProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: connectProvider,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["health-providers"] });
    },
  });
}

export function useDisconnectProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: disconnectProvider,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["health-providers"] });
    },
  });
}
