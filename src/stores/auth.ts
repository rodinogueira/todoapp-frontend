import { defineStore } from "pinia";
import api from "@/services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const res = await api.post("/auth/login", { email, password });
        this.token = res.data.access_token;
        localStorage.setItem("token", this.token);
        return true;
      } catch {
        return false;
      }
    },
    async register(user: { name: string; email: string; password: string }) {
      try {
        const res = await api.post("/auth/register", user)
        this.token = res.data.access_token
        localStorage.setItem("token", this.token)
        return true
      } catch (err) {
        console.error("Erro no registro:", err)
        return false
      }
    },
    logout() {
      this.token = "";
      localStorage.removeItem("token");
    },
  },
});
