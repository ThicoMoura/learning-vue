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
    <v-container fluid>
      <v-row align="center" align-content="center" justify="center">
        <v-col align-self="center" cols="12" sm="4">
          <v-card height="200px" class="text-center">
            <v-span class="text-center text-h3">Wellcome!</v-span>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
