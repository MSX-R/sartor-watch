import { api } from "../lib/api";
import { useAuthStore } from "../store/auth.store";

export async function login(email: string, password: string): Promise<void> {
  const { data } = await api.post("/auth/login", { email, password });

  if (!data?.token) {
    throw new Error("Connexion impossible");
  }

  useAuthStore.getState().setSession(data.token, email);
}

export async function register(
  email: string,
  password: string,
  name?: string,
): Promise<void> {
  const { data } = await api.post("/auth/register", { email, password, name });

  if (!data?.token) {
    throw new Error("Inscription impossible");
  }

  useAuthStore.getState().setSession(data.token, email);
}

export function requireAuth(): void {
  if (!useAuthStore.getState().token) {
    throw new Error("Non authentifié");
  }
}

export async function logout(): Promise<void> {
  useAuthStore.getState().logout();
}
