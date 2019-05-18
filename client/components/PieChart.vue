<template>
  <v-card>
    <v-card-text>
      <canvas id="pieCanvas" count="1"></canvas>
      <chartjs-pie :labels="labels" :data="data" :option="option" target="pieCanvas" :bind="true"></chartjs-pie>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    labels: [],
    data: [],
    option: {}
  }),
  methods: {
    async getRevisionsByUserType() {
      const data = await this.$axios.$get("revisions/getRevisionsByUserType", {
        headers: {
          "x-access-token": this.$store.state.user.authUser.data.token
        }
      });

      this.labels = [];

      for (var i = 0; i < data.data.length; i++) {
        //console.log(data.data[i]);
        this.labels.push(data.data[i]._id);

        data.data[i].admin_revisions
          ? this.data.push(parseInt(data.data[i].admin_revisions))
          : null;
        data.data[i].bot_revisions
          ? this.data.push(parseInt(data.data[i].bot_revisions))
          : null;
        data.data[i].anon_revisions
          ? this.data.push(parseInt(data.data[i].anon_revisions))
          : null;
        data.data[i].regular_revisions
          ? this.data.push(parseInt(data.data[i].regular_revisions))
          : null;

        //console.log(this.types[0]);
        //console.log(this.types[1]);
      }
    }
  },
  mounted() {
    this.getRevisionsByUserType();
  }
};
</script>

<style>
</style>
