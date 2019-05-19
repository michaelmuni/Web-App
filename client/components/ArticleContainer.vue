<template>
  <v-card>
    <v-card-title primary-title>
      <h3>Title: {{ articleTitle ? articleTitle : "N/A" }}</h3>
    </v-card-title>
    <v-card-text>Revisions {{ revisionCount }}</v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      Top 5 Regular Users
      <v-divider></v-divider>
      <template v-for="item in regUsers">
        <p :key="item._id">{{ item._id }}</p>
        <p :key="item._id">Revisions: {{ item.revisions }}</p>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    revisionCount: 0,
    regUsers: []
  }),
  props: ["articleTitle", "yearFrom", "yearTo"],
  methods: {
    async getArticleRevisionsInYearRange() {
      // Get data from server
      // const data = await this.$axios.$get("revisions/ROUTE_NAME", {
      //   headers: {
      //     "x-access-token": this.$store.state.user.authUser.data.token
      //   },
      //   params: {
      //     title: this.articleTitle,
      // MORE PARAMS CAN BE ADDED
      //   }
      // });
      // Manipulate data and assign to places
    }
  },
  watch: {
    // Watcher to track article selection and update accordingly
    // articleTitle: function(value) {
    //   if(value !== null) {
    //     this.getArticleInformation();
    //   }
    // }
  }
};
</script>

<style>
</style>
