import { api } from "../lib/api";
import { useAuthStore } from "../store/auth.store";

const DEV_EMAIL = "test@sartor.app";
const DEV_PASSWORD = "admin123";

export async function ensureAuthenticated(): Promise<void> {
  const { token, setToken } = useAuthStore.getState();

  if (token) {
    return;
  }

  const response = await api.post("/auth/login", {
    email: DEV_EMAIL,
    password: DEV_PASSWORD,
  });

  if (response.data?.token) {
    setToken(response.data.token);
  }
}
