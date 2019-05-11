<template>
  <v-toolbar fixed app>
    <nuxt-link class="pageTitle" to="/">
      <v-toolbar-title v-text="title"/>
    </nuxt-link>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn v-if="isAuthenticated" flat @click="logout">
        Logout
        <v-icon right color="red">power_settings_new</v-icon>
      </v-btn>
      <template v-else>
        <v-btn flat to="/register">Register</v-btn>
        <v-btn flat to="/login">Login</v-btn>
      </template>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    title: "Article Insight"
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: "user/isAuthenticated",
      loggedInUser: "user/loggedInUser"
    })
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      //this.$store.replaceState({});
    }
  }
};
</script>

<style scoped>
.pageTitle {
  text-decoration: none;
  text-decoration-color: none;
  color: black;
}
</style>
