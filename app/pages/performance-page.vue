<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      [Place filter component here]
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component :chartData="getChartData" />
    </div>
  </div>
</template>

<script>
import PerformanceChartComponent from "../components/vue-components/performance-chart.vue";
  import { mapActions, mapGetters } from "vuex";

export default {
  name: "AboutPageComponent",
  components: {
    PerformanceChartComponent,
  },
  mounted(){
    this.fetchChartData();
  },
  methods:{
      ...mapActions(["fetchChartData"]),
  },
  computed:{
      ...mapGetters(["getChartData"]),
  },
};
</script>
