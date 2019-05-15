<template>
  <v-card class="ma-2">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ title }}</h3>
        <div>{{ info }}</div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ["title", "info"]
};
</script>

<style>
</style>
