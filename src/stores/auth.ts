import { ref } from "vue";
import { defineStore } from "pinia";
import { base } from "@/plugins";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(sessionStorage.getItem("tk"));

  const login = async (email: string, pass: string) => {
    const res = await base.post("/login", {
      email: email,
      pass: pass,
    });

    sessionStorage.setItem("tk", res.data.Message);
    token.value = res.data.Message;
  };

  const refresh = async () => {
    if (token.value) {
      await base.get("/");
    }
  };

  return { token, refresh, login };
});
