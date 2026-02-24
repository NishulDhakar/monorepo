import { create } from "zustand";
import { api } from "../lib/api";
import { persist } from "zustand/middleware";

export interface User {
  name: string;
  email: string;
  _id: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });

          const res = await api.post("/auth/login", { email, password });

          set({
            user: res.data.user,
            loading: false,
          });
        } catch (err: any) {
          set({
            loading: false,
            error: err.response?.data?.message || "Login failed",
          });
          throw err;
        }
      },

      register: async (name, email, password) => {
        try {
          set({ loading: true, error: null });

          const res = await api.post("/auth/register", {
            name,
            email,
            password,
          });

          set({
            user: res.data.user,
            loading: false,
          });
        } catch (err: any) {
          set({
            loading: false,
            error: err.response?.data?.message || "Register failed",
          });
          throw err;
        }
      },

      logout: async () => {
        await api.post("/auth/logout");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);