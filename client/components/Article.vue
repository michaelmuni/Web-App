<template>
  <v-card min-height="140px" max-width="160px" class="ma-2 my-3 elevation-5">
    <v-card-title class="primary white--text font-weight-bold">{{ title }}</v-card-title>
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
