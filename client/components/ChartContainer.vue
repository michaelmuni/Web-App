<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Yearly Revision Distribution by User Types</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Revision Number Distribution by User Type</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-layout fill-height column>
          <BarChart/>
          <v-btn color="primary" @click="e1 = 2">Next</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-layout fill-height column>
          <h1>YOLO</h1>
          <v-btn color="primary" @click="e1 = 1">Previous</v-btn>
        </v-layout>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import BarChart from "~/components/BarChart.vue";

export default {
  components: {
    BarChart
  },
  data: () => ({
    e1: 0,
    steps: 2,
    n: 1
  }),
  methods: {
    nextStep() {
      if (this.n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = this.n + 1;
      }
    }
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  }
};
</script>

<style>
</style>
