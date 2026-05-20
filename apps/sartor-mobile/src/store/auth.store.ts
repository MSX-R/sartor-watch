import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

type AuthStore = {
  token: string | null;
  email: string | null;
  setSession: (token: string, email: string) => void;
  logout: () => void;
};

const secureStorage = {
  getItem: (name: string) => SecureStore.getItemAsync(name),
  setItem: (name: string, value: string) => SecureStore.setItemAsync(name, value),
  removeItem: (name: string) => SecureStore.deleteItemAsync(name),
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      setSession: (token, email) => set({ token, email }),
      logout: () => set({ token: null, email: null }),
    }),
    {
      name: "sartor-auth",
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({ token: state.token, email: state.email }),
    },
  ),
);
