<template>
  <v-layout row>
    <v-flex class="mr-5 mt-2" xs1>
      <h4>PLACEHOLDER FOR YEAR INPUT</h4>
      <v-text-field v-model="counter" :disabled="loading" label="Number" outline></v-text-field>
    </v-flex>
    <v-container>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="mr-4">
          <v-icon>search</v-icon>
        </v-toolbar-title>
        <v-autocomplete class="mt-2" v-model="title" :hint="'Type to search'" :items="titles" :label="'Search...'" item-text flat solo-inverted>
          <template v-slot:selection="titles">
            <v-list-tile-content>
              <v-list-tile-title v-html="titles.item._id"></v-list-tile-title>
              <v-list-tile-sub-title v-html="'Revisions: ' + titles.item.revisions"></v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
          <template v-slot:item="titles">
            <v-list-tile-content>
              <v-list-tile-title v-html="titles.item._id"></v-list-tile-title>
              <v-list-tile-sub-title v-html="'Revisions: ' + titles.item.revisions"></v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </v-autocomplete>
      </v-toolbar>
      <ArticleContainer :articleTitle="title"/>
    </v-container>
  </v-layout>
</template>

<script>
import ArticleContainer from "~/components/ArticleContainer.vue";

export default {
  middleware: ["auth"],
  components: {
    ArticleContainer
  },
  data: () => ({
    titles: [],
    title: null,
    counter: 0,
    loading: false
  }),
  methods: {
    async getAllTitles() {
      const data = await this.$axios.$get("revisions/uniqueTitles", {
        headers: {
          "x-access-token": this.$store.state.user.authUser.data.token
        }
      });

      if (data) {
        this.titles = data.data;
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch("user/initializeStore");
  },
  created() {
    this.getAllTitles();
  }
};
</script>

<style>
</style>
