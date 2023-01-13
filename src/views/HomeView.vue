<script setup lang="ts">
import { ref } from "vue";
import { auth } from "@/plugins";
import { useAuthStore } from "@/stores";

import NavBar from "@/components/navbar/NavBar.vue";
import SideBar from "@/components/navbar/SideBar.vue";
import type { User } from "@/types";

const res = auth(useAuthStore().token).get("user/");

const users = ref<Array<User>>([]);

res.then((result) => {
  result.data.forEach((user: User) => {
    users.value.push(user);
  });
});
</script>

<template>
  <NavBar />
  <SideBar />
  <v-main>
    <v-container fluid>
      <v-row align="center" align-content="center" justify="center">
        <v-col align-self="center" cols="10" sm="10">
          <v-card class="text-center">
            <v-table fixed-header fixed-footer height="300px">
              <thead>
                <tr>
                  <th width="5%" class="text-center">Status</th>
                  <th width="25%" class="text-center">Group</th>
                  <th width="25%" class="text-center">Email</th>
                  <th width="25%" class="text-center">Nome</th>
                  <th width="20%" class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in users" :key="item.ID">
                  <td>
                    <span
                      :color="item.Active ? 'green' : 'red'"
                      class="dot"
                    ></span>
                  </td>
                  <td>{{ item.GroupID }}</td>
                  <td>{{ item.Email }}</td>
                  <td>{{ item.Name }}</td>
                  <td>
                    <v-btn
                      size="x-small"
                      icon="mdi-pencil"
                      color="primary"
                      class="mx-1"
                    ></v-btn>
                    <v-btn
                      size="x-small"
                      icon="mdi-delete"
                      color="primary"
                      class="mx-1"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.dot {
  height: 10px;
  width: 10px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
}
</style>
