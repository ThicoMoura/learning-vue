<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useThemeStore } from "@/stores";

export default defineComponent({
  data() {
    return {
      theme: useThemeStore(),
    };
  },
  components: {
    RouterView,
  },
});
</script>

<template>
  <v-app :theme="theme.theme">
    <v-layout>
      <RouterView />
    </v-layout>
  </v-app>
</template>

<style scoped></style>
