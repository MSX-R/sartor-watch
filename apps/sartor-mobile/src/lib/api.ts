import axios from "axios";
import Constants from "expo-constants";

import { useAuthStore } from "../store/auth.store";

const defaultApiUrl =
  (Constants.expoConfig?.extra as { apiUrl?: string } | undefined)?.apiUrl ??
  process.env.EXPO_PUBLIC_API_URL ??
  "http://192.168.1.44:3000/api";

export const api = axios.create({
  baseURL: defaultApiUrl,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
