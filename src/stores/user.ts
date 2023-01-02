import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Permission, User } from "@/types";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const Initials = computed(() => {
    if (user.value) {
      const split = user.value.Name.split(" ");
      return split[0][0] + split[split.length - 1][0];
    }
    return "";
  });

  const SetUser = (
    token: string,
    name: string,
    cpf: string,
    permission: Array<Permission>,
    image?: string
  ) => {
    const u: User = {
      Token: token,
      Name: name,
      Cpf: cpf,
      Permission: permission,
      Image: image,
    };
    user.value = u;
  };

  return { user, Initials, SetUser };
});
