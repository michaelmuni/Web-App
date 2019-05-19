<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout column>
        <h2>Title: {{ articleTitle ? articleTitle : "N/A" }}</h2>
        <h4>Summary Between: {{ yearFrom ? yearFrom : "---" }} to {{ yearTo ? yearTo : "---" }}</h4>
      </v-layout>
    </v-card-title>
    <v-card-text v-if="show">Total revisions: {{ revisionCount }}</v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-divider></v-divider>
      <v-card v-if="show" width="100%">
        <v-card-title class="primary white--text">Top 5 Regular Users</v-card-title>
        <v-card-text>
          <v-list>
            <template v-for="item in regUsers">
              <v-list-tile :key="item._id">
                <v-list-tile-title v-html="item._id"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.usercount"></v-list-tile-sub-title>
              </v-list-tile>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-card-text>
    <ChartContainer v-if="show" type="individual"/>
  </v-card>
</template>

<script>
import ChartContainer from "~/components/ChartContainer";

export default {
  components: {
    ChartContainer
  },
  data: () => ({
    revisionCount: 0,
    regUsers: [],
    show: false
  }),
  props: ["articleTitle", "yearFrom", "yearTo", "update"],
  methods: {
    async getArticleSummary() {
      if (
        this.articleTitle !== null &&
        this.yearFrom !== null &&
        this.yearTo !== null &&
        this.update === true
      ) {
        this.show = true;
        const data = await this.$axios.$get("revisions/displaySummaryInfo", {
          headers: {
            "x-access-token": this.$store.state.user.authUser.data.token
          },
          params: {
            title: this.articleTitle,
            fromyear: this.yearFrom,
            toyear: this.yearTo
          }
        });

        this.revisionCount = data.data[0].Total[0].Total;
        this.regUsers = [];

        for (var i = 0; i < 5; i++) {
          this.regUsers.push(data.data[0].TopFive[i]);
        }

        this.$emit("done", true);
      }
    }
  },
  watch: {
    update: function(value) {
      if (value === true) {
        this.getArticleSummary();
      }
    }
  }
};
</script>

<style>
</style>
