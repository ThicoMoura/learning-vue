<script lang="ts">
import { defineComponent } from "vue";
import { axios } from "@/plugins";

export default defineComponent({
  data() {
    return {
      cpf: "062.164.921-01",
      pass: "123456",
      load: false,
    };
  },
  mounted() {
    axios.get("/").catch((err) => console.log(err));
    console.log();
  },
});
</script>

<template>
  <v-container fluid>
    <v-row
      align="center"
      class="h-screen"
      align-content="center"
      justify="center"
    >
      <v-col align-self="center" class="align-center" cols="12" sm="4">
        <v-card height="300px" title="Login" :loading="load">
          <v-card-text>
            <v-text-field
              clearable
              label="Cpf"
              prepend-icon="mdi-account-tie"
              v-model="cpf"
            ></v-text-field>
            <v-text-field
              clearable
              label="Pass"
              type="password"
              prepend-icon="mdi-lock"
              hint="Enter your password to access this website"
              v-model="pass"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="load = !load">Click me</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
