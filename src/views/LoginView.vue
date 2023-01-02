<script lang="ts">
import { axios } from "@/plugins";
import { defineComponent, ref } from "vue";
import AlertComponent from "@/components/alert/AlertComponent.vue";
import { AxiosError } from "axios";
import { _Error } from "@/types";
import type { Alert } from "@/types";
import { useUserStore } from "@/stores";

export default defineComponent({
  data() {
    return {
      cpf: ref(""),
      pass: ref(""),
      load: ref(false),
      onAlert: ref(false),
      alert: ref<Alert>({
        Color: "",
        Icon: "",
        Message: "",
      }),
    };
  },
  methods: {
    async login() {
      try {
        this.load = true;
        if (!this.cpf) {
          throw new _Error("Cpf can't be empty", "yellow", "mdi-alert-octagon");
        }
        if (this.cpf.length < 11) {
          throw new _Error(
            "Cpf must be least at 11 characters",
            "yellow",
            "mdi-alert-octagon"
          );
        }
        if (!this.pass) {
          throw new _Error(
            "Pass can't be empty",
            "yellow",
            "mdi-alert-octagon"
          );
        }
        const response = await axios.post("/login", {
          CPF: this.cpf,
          Pass: this.pass,
        });

        useUserStore().SetUser(response.data.Message.Token, response.data.Message.Name, response.data.Message.CPF, [], null);
        console.log(useUserStore().user);
      } catch (err) {
        this.onAlert = false;
        if (err instanceof _Error) {
          this.alert.Color = err.color;
          this.alert.Icon = err.icon;
          this.alert.Message = err.message;
        } else if (err instanceof AxiosError) {
          if (AxiosError.ERR_BAD_REQUEST == err.code) {
            if (err.response) {
              switch (err.response?.data.Code) {
                case 400:
                  this.alert.Color = "yellow";
                  this.alert.Icon = "mdi-alert-octagon";
                  this.alert.Message = err.response?.data.Message;
                  break;
                case 401:
                  this.alert.Color = "red";
                  this.alert.Icon = "mdi-close-octagon";
                  if (err.response?.data.Message == "no rows in result set") {
                    this.alert.Message = "This CPF incorret!";
                  } else {
                    this.alert.Message = "This pass incorret!";
                  }
                  break;
              }
            }
          }
        } else {
          this.alert.Color = "";
          this.alert.Icon = "";
          this.alert.Message = "";
        }
        this.onAlert = true;
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
          elevation="5"
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
        :color="alert.Color"
        :icon="alert.Icon"
        :message="alert.Message"
      />
    </v-row>
  </v-container>
</template>
