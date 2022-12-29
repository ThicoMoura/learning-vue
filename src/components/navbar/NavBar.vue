<script lang="ts">
import { defineComponent, ref } from "vue";
import { useThemeStore, useSideBarStore, useUserStore } from "@/stores";

export default defineComponent({
  data() {
    const { user, Initials } = useUserStore();
    return {
      theme: useThemeStore(),
      drawer: useSideBarStore(),
      ring: ref(false),
      user,
      Initials,
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
          <v-avatar color="brown" :image="user.Image">
            <span class="text-h6">{{ user.Image ? "" : Initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <h3>{{ user.Name }}</h3>
            <p class="text-caption mt-1">
              {{ user.Cpf }}
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
