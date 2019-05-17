<template>
  <v-card>
    <v-card-title primary-title class="primary white--text">
      <h4 class="overflow-hidden">Yearly revision number distribution</h4>
    </v-card-title>
    <v-card-text>
      <canvas id="fooCanvas" count="4"/>
      <!-- <chartjs-bar
        v-for="(item, index) in types"
        v-bind:key="index"
        v-bind:backgroundcolor="item.bgColor"
        v-bind:beginzero="beginZero"
        v-bind:bind="true"
        v-bind:bordercolor="item.borderColor"
        v-bind:data="item.data"
        v-bind:datalabel="item.dataLabel"
        v-bind:labels="labels"
        target="fooCanvas"
      />-->
      <chartjs-bar
        :labels="labels"
        :datalabel="types[0].label"
        :data="types[0].data"
        :backgroundcolor="types[0].backgroundColor"
        :bordercolor="types[0].borderColor"
        :bind="true"
        target="fooCanvas"
      ></chartjs-bar>
      <chartjs-bar
        :labels="labels"
        :datalabel="types[1].label"
        :data="types[1].data"
        :backgroundcolor="types[1].backgroundColor"
        :bordercolor="types[1].borderColor"
        :bind="true"
        target="fooCanvas"
      ></chartjs-bar>
      <chartjs-bar
        :labels="labels"
        :datalabel="types[2].label"
        :data="types[2].data"
        :backgroundcolor="types[2].backgroundColor"
        :bordercolor="types[2].borderColor"
        :bind="true"
        target="fooCanvas"
      ></chartjs-bar>
      <chartjs-bar
        :labels="labels"
        :datalabel="types[3].label"
        :data="types[3].data"
        :backgroundcolor="types[3].backgroundColor"
        :bordercolor="types[3].borderColor"
        :bind="true"
        target="fooCanvas"
      ></chartjs-bar>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    beginZero: true,
    labels: [],
    types: [
      {
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        label: "Administrator",
        data: []
      },
      {
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        label: "Anonymous",
        data: []
      },
      {
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
        label: "Bot",
        data: []
      },
      {
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        label: "Regular User",
        borderWidth: 1,
        data: []
      }
    ]
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

      //console.log(data);
      this.labels = [];

      for (var i = 0; i < data.data.length; i++) {
        //console.log(data.data[i]);
        this.labels.push(data.data[i]._id);

        data.data[i].admin_revisions
          ? this.types[0].data.push(parseInt(data.data[i].admin_revisions))
          : this.types[0].data.push(0);
        data.data[i].bot_revisions
          ? this.types[2].data.push(parseInt(data.data[i].bot_revisions))
          : this.types[2].data.push(0);
        data.data[i].anon_revisions
          ? this.types[1].data.push(parseInt(data.data[i].anon_revisions))
          : this.types[1].data.push(0);
        data.data[i].reg_revisions
          ? this.types[3].data.push(parseInt(data.data[i].reg_revisions))
          : this.types[3].data.push(0);

        //console.log(this.types[0]);
        //console.log(this.types[1]);
      }
    }
  },
  mounted() {
    this.getOverallYearRevisionDist();
  }
};
</script>

<style>
</style>
