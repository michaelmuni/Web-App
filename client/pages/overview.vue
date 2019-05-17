<template>
  <v-layout align-center row>
    <v-flex class="mr-5" xs1>
      <h4>No. of Articles</h4>
      <v-text-field v-model="counter" label="Number" outline></v-text-field>
    </v-flex>
    <v-layout column>
      <v-flex>
        <HorizontalCards objectType="hirev" objectHeader="Articles with Highest Revisions" :counter="counter"/>
        <HorizontalCards objectType="lorev" objectHeader="Articles with Lowest Revisions" :counter="counter"/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import HorizontalCards from "~/components/HorizontalCards.vue";

export default {
  middleware: "auth",
  components: {
    HorizontalCards
  },
  data: () => ({
    counter: 2
  }),
  beforeCreate() {
    this.$store.dispatch("user/initializeStore");
  }
};
</script>
