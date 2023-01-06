import { defineStore } from "pinia";
import { auth } from "@/plugins";
import { useAuthStore } from "./auth";
import type { User } from "@/types";

export const useUserStore = defineStore("user", () => {
  const user = async () => {
    const res = await auth(useAuthStore().token).get("/profile");

    return <User>{
      Name: res.data.Message.Name,
      Email: res.data.Message.Email,
      Image: undefined,
    };
  };

  const Initials = (name: string) => {
    const split = name.split(" ");
    return split[0][0] + split[split.length - 1][0];
  };

  return { user, Initials };
});
