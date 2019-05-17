<template>
  <v-container grid-list-md text-xs-center>
    <v-layout column>
      <v-layout align-center row>
        <h2 class="pb-4">{{ objectHeader }}</h2>
      </v-layout>
      <v-layout wrap row>
        <div class="box">
          <div class="loader" v-if="loading">
            <v-progress-circular :width="5" :size="50" color="primary" indeterminate></v-progress-circular>
          </div>
          <Article v-for="item in items" :key="item.title" v-bind:title="item.title" v-bind:info="item.info"/>
        </div>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import Article from "~/components/Article.vue";

export default {
  components: {
    Article
  },
  props: ["objectType", "objectHeader", "counter"],
  data: () => ({
    //counter: 2,
    loading: false,
    items: []
  }),
  methods: {
    async getHighestRevisionArticles() {
      //console.log(this.$store.state.user.authUser.data.token);
      this.items = [];
      this.loading = true;
      const data = await this.$axios.$get(
        "revisions/getHighestRevisionsWithValue",
        {
          headers: {
            "x-access-token": this.$store.state.user.authUser.data.token
          },
          params: { limit: this.counter }
        }
      );

      if (data) {
        this.loading = false;
        for (var i = 0; i < data.data.length; i++) {
          let item = {
            title: data.data[i]._id,
            info: "Revisions: " + data.data[i].count
          };

          this.items.push(item);
        }
      }
    },

    async getLowestRevisionArticles() {
      this.items = [];
      this.loading = true;
      const data = await this.$axios.$get(
        "revisions/getLowestRevisionsWithValue",
        {
          headers: {
            "x-access-token": this.$store.state.user.authUser.data.token
          },
          params: { limit: this.counter }
        }
      );

      if (data) {
        this.loading = false;
        for (var i = 0; i < data.data.length; i++) {
          let item = {
            title: data.data[i]._id,
            info: "Revisions: " + data.data[i].count
          };

          this.items.push(item);
        }
      }
    }
  },
  created() {
    if (this.objectType === "hirev") {
      this.getHighestRevisionArticles();
    } else {
      this.getLowestRevisionArticles();
    }
  },
  watch: {
    counter: function(value) {
      if (value != "") {
        //console.log(value);
        if (this.objectType === "hirev") {
          this.getHighestRevisionArticles();
        } else {
          this.getLowestRevisionArticles();
        }
      }
    }
  }
};
</script>

<style>
.box {
  width: 100%;
  border-style: solid;
  border-width: 2px;
  border-color: black;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
}

.loader {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  margin: 20px;
}
</style>
