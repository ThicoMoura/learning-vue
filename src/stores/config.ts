import { ref } from "vue";
import { defineStore } from "pinia";

const useThemeStore = defineStore("appTheme", () => {
  const theme = ref("light");
  function toggle() {
    theme.value = theme.value === "light" ? "dark" : "light";
  }

  return { theme, toggle };
});

const useSideBarStore = defineStore("sideBar", () => {
  const drawer = ref(true);
  function toggle() {
    drawer.value = !drawer.value;
  }

  return { drawer, toggle };
});

export { useThemeStore, useSideBarStore };
