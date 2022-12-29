<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "@/components/navbar/NavBar.vue";
import SideBar from "@/components/navbar/SideBar.vue";

export default defineComponent({
  components: {
    NavBar,
    SideBar,
  },
});
</script>

<template>
  <NavBar />
  <SideBar />
  <v-main>
    <v-card height="200px"></v-card>
  </v-main>
</template>
