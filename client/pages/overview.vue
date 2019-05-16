<template>
  <v-layout column align-center>
    <v-flex>
      <v-flex xs2>
        <v-text-field v-model="counter" label="Count" outline></v-text-field>
      </v-flex>
      <HorizontalCards
        objectType="hirev"
        objectHeader="Articles with Highest Revisions"
        :counter="counter"
      />
    </v-flex>
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
