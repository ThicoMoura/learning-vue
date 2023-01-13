<script lang="ts">
import { defineComponent, ref } from "vue";
import AlertComponent from "@/components/alert/AlertComponent.vue";
import { AxiosError } from "axios";
import { _Error } from "@/types";
import type { Alert } from "@/types";
import { useAuthStore } from "@/stores";
import router from "@/router";

export default defineComponent({
  data() {
    return {
      form: ref(false),
      show: ref(false),
      email: ref(""),
      pass: ref(""),
      load: ref(false),
      onAlert: ref(false),
      alert: ref<Alert>({
        Color: "",
        Icon: "",
        Message: "",
      }),
      rules: {
        Email: [
          (v: string) => !!v || "E-mail is required",
          (v: string) => /.+@.+\./.test(v) || "E-mail must be valid",
        ],
        Pass: [
          (v: string) => !!v || "Pass is required",
          (v: string) =>
            v.length >= 6 ||
            "Pass must be greater than or equal to 6 characters",
        ],
      },
    };
  },
  methods: {
    async login() {
      try {
        if (!this.form) return;
        this.onAlert = false;
        this.alert.Color = "";
        this.alert.Icon = "";
        this.alert.Message = "";
        this.load = true;
        if (!this.email) {
          throw new _Error(
            "email can't be empty",
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

        await useAuthStore().login(this.email, this.pass);

        router.push({ name: "Home" });
      } catch (err) {
        if (err instanceof _Error) {
          this.alert.Color = err.color;
          this.alert.Icon = err.icon;
          this.alert.Message = err.message;
        } else if (err instanceof AxiosError) {
          console.log("axios");
          if (AxiosError.ERR_BAD_REQUEST == err.code) {
            console.log("bad request");
            if (err.response) {
              console.log("response");
              switch (err.response?.status) {
                case 400:
                  this.alert.Color = "yellow";
                  this.alert.Icon = "mdi-alert-octagon";
                  this.alert.Message = err.response?.data;
                  console.log(this.alert);
                  break;
                case 401:
                  this.alert.Color = "red";
                  this.alert.Icon = "mdi-close-octagon";
                  if (err.response?.data == "no rows in result set") {
                    this.alert.Message = "This email incorret!";
                  } else {
                    this.alert.Message = "This pass incorret!";
                  }
                  break;
                default:
                  console.log("default");
                  break;
              }
            }
          }
        } else {
          this.alert.Color = "Red";
          this.alert.Icon = "mdi-close-octagon";
          this.alert.Message = "Server Error!";
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
      <v-col align-self="center" class="align-center" cols="8" sm="6" md="4">
        <v-card class="text-center" height="300px" title="Login" elevation="5">
          <v-card-text>
            <v-form v-model="form" @submit.prevent="login">
              <v-text-field
                v-model="email"
                :rules="rules.Email"
                :readonly="load"
                clearable
                required
                label="Email"
                autocomplete="email"
                prepend-icon="mdi-account-tie"
              ></v-text-field>
              <v-text-field
                v-model="pass"
                :rules="rules.Pass"
                :readonly="load"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                clearable
                required
                label="Pass"
                prepend-icon="mdi-lock"
                autocomplete="current-password"
              ></v-text-field>
              <br />
              <v-btn
                :disabled="!form"
                :loading="load"
                block
                :color="form ? 'success' : ''"
                type="submit"
                variant="elevated"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
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
