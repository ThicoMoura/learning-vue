import { defineStore } from "pinia";
import { auth } from "@/plugins";
import { useAuthStore } from "./auth";
import type { User } from "@/types";

export const useUserStore = defineStore("user", () => {
  const user = async () => {
    const res = await auth(useAuthStore().token()).get("user/profile/");

    return <User>{
      ID: res.data.ID,
      GroupID: res.data.GroupID,
      Name: res.data.Name,
      Email: res.data.Email,
      Image: undefined,
      Active: res.data.Active,
    };
  };

  const Initials = (name: string | undefined) => {
    if (name) {
      const split = name.split(" ");
      return split[0][0] + split[split.length - 1][0];
    }
    return "";
  };

  return { user, Initials };
});
