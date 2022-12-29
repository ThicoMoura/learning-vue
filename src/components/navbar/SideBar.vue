<script lang="ts">
import { defineComponent } from "vue";
import { useSideBarStore } from "@/stores";

export default defineComponent({
  data() {
    return {
      drawer: useSideBarStore(),
    };
  },
});
</script>

<template>
  <v-navigation-drawer :rail="drawer.drawer" permanent>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        title="Home"
        value="home"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
