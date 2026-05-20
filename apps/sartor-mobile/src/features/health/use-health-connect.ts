import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Platform } from "react-native";

import {
  connectHealthConnectPermissions,
  getHealthConnectAvailability,
  openHealthConnectSettings,
} from "../../services/health-connect.service";
import { useAuthStore } from "../../store/auth.store";

export function useHealthConnectStatus() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["health-connect-status"],
    enabled: Boolean(token) && Platform.OS === "android",
    queryFn: getHealthConnectAvailability,
  });
}

export function useConnectHealthConnect() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: connectHealthConnectPermissions,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["health-connect-status"] });
      await queryClient.invalidateQueries({ queryKey: ["health-providers"] });
    },
  });
}

export function useOpenHealthConnectSettings() {
  return useMutation({
    mutationFn: async () => {
      await openHealthConnectSettings();
    },
  });
}
