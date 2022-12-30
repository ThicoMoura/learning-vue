<script lang="ts">
import { axios } from "@/plugins";
import { defineComponent, ref } from "vue";
import AlertComponent from "@/components/alert/AlertComponent.vue";

export default defineComponent({
  data() {
    return {
      cpf: ref(""),
      pass: ref(""),
      load: ref(false),
      onAlert: ref(false),
    };
  },
  methods: {
    async login() {
      try {
        this.load = true;
        if (this.cpf === "") {
          this.onAlert = true;
        }
        const response = await axios.post("/login", {
          CPF: this.cpf,
          Pass: this.pass,
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        this.load = false;
      }
    },
  },
  components: {
    Alert: AlertComponent,
  },
});
</script>

<template>
  <v-container justify="center" fluid>
    <v-row
      align="center"
      class="h-screen"
      align-content="center"
      justify="center"
    >
      <v-col align-self="center" class="align-center" cols="12" sm="4">
        <v-card
          class="text-center"
          height="300px"
          title="Login"
          :loading="load"
        >
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
          <v-card-actions class="justify-center">
            <v-btn @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <Alert
        v-model="onAlert"
        color="red"
        message="teste"
        icon="mdi-close-octagon"
      />
    </v-row>
  </v-container>
</template>
