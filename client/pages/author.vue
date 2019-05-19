<template>
  <v-container>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="mr-4">
        <v-icon>search</v-icon>
      </v-toolbar-title>
      <v-autocomplete class="mt-2" v-model="author" :hint="'Type to search'" :items="authors" :label="'Search...'" item-text="_id" item-value="_id" flat solo-inverted>
        <template v-slot:selection="authors">
          <v-list-tile-content>
            <v-list-tile-title v-html="authors.item._id"></v-list-tile-title>
            <v-list-tile-sub-title v-html="'Revisions: ' + authors.item.user"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template v-slot:item="authors">
          <v-list-tile-content>
            <v-list-tile-title v-html="authors.item._id"></v-list-tile-title>
            <v-list-tile-sub-title v-html="'Revisions: ' + authors.item.user"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
      </v-autocomplete>
    </v-toolbar>
    <v-card>
      <v-card-title>Aricles by Author</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click>
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: ["auth"],
  data: () => ({
    authors: [],
    author: null
  }),
  methods: {
    async getAuthorList() {
      const data = await this.$axios.$get("revisions/getAllAuthors", {
        headers: {
          "x-access-token": this.$store.state.user.authUser.data.token
        }
      });

      if (data) {
        this.authors = data.data;
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch("user/initializeStore");
  },
  created() {
    this.getAuthorList();
  }
};
</script>

<style>
</style>
