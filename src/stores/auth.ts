import { defineStore } from "pinia";
import { base } from "@/plugins";

export const useAuthStore = defineStore("auth", () => {
  const login = async (email: string, pass: string) => {
    const res = await base.post("login/", {
      email: email,
      pass: pass,
    });

    sessionStorage.setItem("tk", res.data.Message);
  };

  return { login };
});
