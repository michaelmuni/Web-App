<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login form</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="loginForm">
        <v-text-field
          v-model="email"
          prepend-icon="person"
          name="email"
          label="Email"
          type="email"
          :rules="validationRules.email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          id="password"
          prepend-icon="lock"
          name="password"
          label="Password"
          type="password"
          :rules="validationRules.password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-alert v-model="alert" dismissible v-if="alert" type="error">{{ error }}</v-alert>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat small nuxt to="/register">Register</v-btn>
      <v-btn color="primary" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    alert: false,
    error: "",
    validationRules: {
      email: [v => !!v || "Required"],
      password: [v => !!v || "Required"]
    }
  }),
  methods: {
    async login() {
      //   if (this.$refs.loginForm.validate()) {
      //     try {
      //       const response = await this.$axios.$post("user/authenticate", {
      //         email: this.email,
      //         password: this.password
      //       });

      //       if (response !== null) {
      //         if (response.status !== "error") {
      //           localStorage.setItem("userInfo", JSON.stringify(response.data));

      //           this.email = "";
      //           this.password = "";

      //           this.$refs.loginForm.resetValidation();

      //           this.$router.push({
      //             path: "/overview"
      //           });
      //         } else {
      //           this.alert = true;
      //         }
      //       } else {
      //         //
      //       }
      //     } catch (e) {
      //       //this.formError = e.message;
      //     }
      //   }
      // }
      if (this.$refs.loginForm.validate()) {
        try {
          await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          });

          this.$router.push("/");
        } catch (e) {
          this.alert = true;
          this.error = e.response.data.message;
        }
      }
    }
  }
};
</script>

<style>
</style>
