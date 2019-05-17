<template>
  <v-layout row>
    <v-flex class="mr-5" xs1>
      <h4>No. of Articles</h4>
      <v-text-field v-model="counter" :disabled="loading" label="Number" outline></v-text-field>
    </v-flex>
    <v-layout column>
      <v-flex>
        <HorizontalCards
          objectType="hirev"
          objectHeader="Articles with Highest Revisions"
          :counter="counter"
          @loading="loadingData"
        />
        <HorizontalCards
          objectType="lorev"
          objectHeader="Articles with Lowest Revisions"
          :counter="counter"
          @loading="loadingData"
        />
      </v-flex>
      <v-layout row>
        <HorizontalCards
          objectType="hiuser"
          objectHeader="Article with Most Registered Users"
          :counter="counter"
        />
        <HorizontalCards
          objectType="louser"
          objectHeader="Article with Least Registered Users"
          :counter="counter"
        />
      </v-layout>
      <v-layout row>
        <HorizontalCards
          objectType="oldest"
          objectHeader="Articles with Longest History"
          :counter="counter"
        />
        <HorizontalCards
          objectType="youngest"
          objectHeader="Article with Shortest History"
          :counter="counter"
        />
      </v-layout>
      <BarChart/>
    </v-layout>
  </v-layout>
</template>

<script>
import HorizontalCards from "~/components/HorizontalCards.vue";
import BarChart from "~/components/BarChart.vue";

export default {
  middleware: "auth",
  components: {
    HorizontalCards,
    BarChart
  },
  data: () => ({
    counter: 2,
    loading: false
  }),
  beforeCreate() {
    this.$store.dispatch("user/initializeStore");
  },
  methods: {
    loadingData(value) {
      this.loading = value;
    }
  }
};
</script>
