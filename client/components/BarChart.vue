<template>
  <v-card class="elevation-0">
    <v-card-text ref="ccontainer">
      <chartjs-bar :labels="xlabels" :datasets="xdatasets" :bind="true"></chartjs-bar>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    xlabels: [],
    xdatasets: [
      {
        label: "Administrator",
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        data: []
      },
      {
        label: "Anonymous",
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        data: []
      },
      {
        label: "Bot",
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        data: []
      },
      {
        label: "Regular User",
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        data: []
      }
    ],
    beginZero: true,
    loaded: false
  }),
  methods: {
    async getOverallYearRevisionDist() {
      const data = await this.$axios.$get(
        "revisions/getRevisionDistributionByYearUser",
        {
          headers: {
            "x-access-token": this.$store.state.user.authUser.data.token
          }
        }
      );

      for (var i = 0; i < data.data.length; i++) {
        this.xlabels.push(data.data[i]._id);

        if (data.data[i].admin_revisions) {
          this.xdatasets[0].backgroundColor.push("rgba(255, 99, 132, 0.2)");
          this.xdatasets[0].borderColor.push("rgba(255, 99, 132, 1)");
          this.xdatasets[0].data.push(data.data[i].admin_revisions);
        }
        if (data.data[i].anon_revisions) {
          this.xdatasets[1].backgroundColor.push("rgba(54, 162, 235, 0.2)");
          this.xdatasets[1].borderColor.push("rgba(54, 162, 235, 1)");
          this.xdatasets[1].data.push(data.data[i].anon_revisions);
        }
        if (data.data[i].bot_revisions) {
          this.xdatasets[2].backgroundColor.push("rgba(255, 206, 86, 0.2)");
          this.xdatasets[2].borderColor.push("rgba(255, 206, 86, 1)");
          this.xdatasets[2].data.push(data.data[i].bot_revisions);
        }
        if (data.data[i].reg_revisions) {
          this.xdatasets[3].backgroundColor.push("rgba(75, 192, 192, 0.2)");
          this.xdatasets[3].borderColor.push("rgba(75, 192, 192, 1)");
          this.xdatasets[3].data.push(data.data[i].reg_revisions);
        }
      }

      this.$emit("loaded", true);

      console.log(this.xdatasets);
    }
  },
  created() {
    this.getOverallYearRevisionDist();
  }
};
</script>

<style>
</style>
