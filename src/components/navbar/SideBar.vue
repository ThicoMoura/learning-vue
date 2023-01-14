<script setup lang="ts">
import { useSideBarStore } from "@/stores";
import { ref, watch } from "vue";

const drawer = useSideBarStore();
const data = [
  {
    title: "Systems",
    value: "system",
    icon: "mdi-office-building",
  },
  {
    title: "Access",
    value: "access",
    icon: "mdi-account-key",
  },
  {
    title: "Groups",
    value: "group",
    icon: "mdi-account-group",
  },
  {
    title: "Users",
    value: "user",
    icon: "mdi-account",
  },
  {
    title: "Sessions",
    value: "session",
    icon: "mdi-account-details",
  },
];

const value = ref(null);

watch(value, (i, j) => {
  console.log(i, j);
});
</script>

<template>
  <v-navigation-drawer :rail="drawer.drawer" permanent>
    <v-tabs v-model="value" direction="vertical" :items="data">
      <v-tab v-for="item in data" :key="item.value" :value="item.value">
        <v-icon size="large" :icon="item.icon" class="mx-2"></v-icon>
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <!-- <v-list
      @select="test"
      :item="item"
      :items="data"
      density="compact"
      nav
    ></v-list> -->
  </v-navigation-drawer>
</template>
