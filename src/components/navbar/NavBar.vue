<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useThemeStore, useSideBarStore, useUserStore } from "@/stores";
import type { User } from "@/types";
import { auth } from "@/plugins";

const theme = useThemeStore();
const drawer = useSideBarStore();
const ring = ref(true);

const { push } = useRouter();

const { user, Initials } = useUserStore();

const u = ref<User>();

user().then((res) => {
  u.value = res;
});

const logout = async () => {
  await auth(sessionStorage.getItem("tk"))
    .get("logout/")
    .then((res) => {
      if (res.status === 200) {
        sessionStorage.removeItem("tk");
        push({ name: "Login" })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
};
</script>

<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer.toggle"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Home</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-menu location="bottom" transition="scroll-y-transition" rounded>
      <template v-slot:activator="{ props }">
        <v-btn
          :icon="ring ? 'mdi-bell-badge' : 'mdi-bell'"
          v-bind="props"
        ></v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col col="1" sm="1"><v-icon icon="mdi-email"></v-icon></v-col>
            <v-col col="10" sm="10"><p>Example alert notification</p></v-col>
            <v-col col="1" sm="1">
              <v-btn icon="mdi-close" variant="text"></v-btn>
            </v-col>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-row>
            <v-col col="1"><v-icon icon="mdi-email-open"></v-icon></v-col>
            <v-col col="10"><p>Example opened notification</p></v-col>
            <v-col col="1">
              <v-btn icon="mdi-close" variant="text"></v-btn>
            </v-col>
          </v-row>
        </v-card-text>
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
          <v-avatar color="primary" :image="u?.Image">
            <span class="text-h6">{{ u?.Image ? "" : Initials(u?.Name) }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <h3>{{ u?.Name }}</h3>
            <p class="text-caption mt-1">
              {{ u?.Email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn append-icon="mdi-account-edit" rounded variant="text">
              Edit Account
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text" @click="logout">Logout</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
