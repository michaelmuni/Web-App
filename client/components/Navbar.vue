<template>
  <v-toolbar fixed app>
    <nuxt-link class="pageTitle" to="/">
      <v-toolbar-title v-text="title"/>
    </nuxt-link>
    <v-spacer/>
    <v-btn v-if="isAuthenticated" flat>Logout</v-btn>
    <v-btn v-if="!isAuthenticated" flat to="/register">Register</v-btn>
    <v-btn v-if="!isAuthenticated" flat to="/login">Login</v-btn>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    title: 'Article Insight'
  }),
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}
</script>

<style scoped>
.pageTitle {
  text-decoration: none;
  text-decoration-color: none;
  color: black;
}
</style>
