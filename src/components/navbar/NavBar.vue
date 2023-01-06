<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore, useSideBarStore, useUserStore } from "@/stores";
import type { User } from "@/types";

const theme = useThemeStore();
const drawer = useSideBarStore();
const ring = ref(false);

const { user, Initials } = useUserStore();

const u = ref<User>({
  Email: "",
  Name: "",
  Image: undefined,
});

user().then((res) => {
  u.value = res;
});
</script>

<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer.toggle"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Title</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-menu location="bottom" transition="scroll-y-transition" rounded>
      <template v-slot:activator="{ props }">
        <v-btn
          :icon="ring ? 'mdi-bell-badge' : 'mdi-bell'"
          v-bind="props"
        ></v-btn>
      </template>
      <v-card>
        <v-card-text>Teste</v-card-text>
      </v-card>
    </v-menu>
    <v-btn
      @click="theme.toggle"
      :icon="
        theme.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
      "
    />
    <v-menu location="bottom" transition="scroll-y-transition" rounded>
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          class="d-flex align-center justify-space-around"
          v-bind="props"
        >
          <v-avatar color="brown" :image="u.Image">
            <span class="text-h6">{{ u.Image ? "" : Initials(u.Name) }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <h3>{{ u.Name }}</h3>
            <p class="text-caption mt-1">
              {{ u.Email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text">Edit Account</v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text">Disconnect</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
