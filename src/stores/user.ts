import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface Permission {
  Name: string;
  Type: Array<string>;
}

interface User {
  Token: string;
  Name: string;
  Cpf: string;
  Permission: Array<Permission>;
  Image?: string;
}

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const Initials = computed(() => {
    if (user.value) {
      const split = user.value.Name.split(" ");
      return split[0][0] + split[split.length - 1][0];
    }
    return "";
  });

  return { user, Initials };
});
