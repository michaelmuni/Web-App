<template>
  <v-toolbar fixed app>
    <nuxt-link class="pageTitle" to="/">
      <v-toolbar-title v-text="title"/>
    </nuxt-link>
    <v-spacer/>
    <v-btn flat>Logout</v-btn>
    <v-btn flat to="/register">Register</v-btn>
    <v-btn flat to="/login">Login</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    title: 'Article Insight'
  })
}
</script>

<style scoped>
.pageTitle {
  text-decoration: none;
  text-decoration-color: none;
  color: black;
}
</style>
