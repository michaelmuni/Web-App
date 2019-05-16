<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>Hello There!</h1>
      <v-img src="https://source.unsplash.com/random" aspect-ratio="1"></v-img>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: "guest",
  components: {},
  beforeCreate() {
    this.$store.dispatch("user/initializeStore");
  }
};
</script>
