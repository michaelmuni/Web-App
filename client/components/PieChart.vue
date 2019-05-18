<template>
  <v-card>
    <v-card-text>
      <chartjs-pie :labels="xlabels" :datasets="xdatasets" :option="option" :bind="true"></chartjs-pie>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    xlabels: [],
    xdatasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)"
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)"
        ]
      }
    ],
    option: {},
    loaded: false
  }),
  methods: {
    async getRevisionsByUserType() {
      const data = await this.$axios.$get("revisions/getRevisionsByUserType", {
        headers: {
          "x-access-token": this.$store.state.user.authUser.data.token
        }
      });

      for (var i = 0; i < data.data.length; i++) {
        this.xlabels.push(data.data[i]._id);

        data.data[i].admin_revisions
          ? this.xdatasets[0].data.push(parseInt(data.data[i].admin_revisions))
          : null;
        data.data[i].bot_revisions
          ? this.xdatasets[0].data.push(parseInt(data.data[i].bot_revisions))
          : null;
        data.data[i].anon_revisions
          ? this.xdatasets[0].data.push(parseInt(data.data[i].anon_revisions))
          : null;
        data.data[i].reg_revisions
          ? this.xdatasets[0].data.push(parseInt(data.data[i].reg_revisions))
          : null;
      }

      this.$emit("loaded", true);
    }
  },
  created() {
    this.getRevisionsByUserType();
  }
};
</script>

<style>
</style>
