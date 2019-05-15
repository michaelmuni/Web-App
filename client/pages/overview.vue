<template>
  <v-layout align-center>
    <v-flex>
      <HorizontalCards objectType="hirev" objectHeader="Articles with Highest Revisions"/>
    </v-flex>
  </v-layout>
</template>

<script>
import HorizontalCards from "~/components/HorizontalCards.vue";

export default {
  //middleware: "auth"
  components: {
    HorizontalCards
  },
  beforeCreate() {
    this.$store.dispatch("user/initializeStore");
  }
};
</script>
