<template>
  <v-card max-width="160px" class="ma-2 my-3 elevation-5">
    <v-card-title primary-title class="primary white--text">
      <h4 class="overflow-hidden">{{ title }}</h4>
    </v-card-title>
    <v-card-text>{{ info }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["title", "info"]
};
</script>

<style>
</style>
