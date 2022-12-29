<script lang="ts">
import { defineComponent } from "vue";
import { useThemeStore, useSideBarStore } from "@/stores";

export default defineComponent({
  data() {
    return {
      theme: useThemeStore(),
      drawer: useSideBarStore(),
    };
  },
});
</script>

<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer.toggle"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Title</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn
      @click="theme.toggle"
      :icon="
        theme.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
      "
    />
  </v-app-bar>
</template>
