<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      <div class="c-filter">
        <label for="">Start Date:</label>
        <input type="date" v-model="startDate" />
      </div>
      <div class="c-filter">
        <label for="">End Date:</label>
        <input type="date" v-model="endDate" />
      </div>
      <button class="c-button" @click="onClearDates">Clear</button>
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component :chartData="onUpdateChartData" />
    </div>
  </div>
</template>

<script>
import PerformanceChartComponent from "../components/vue-components/performance-chart.vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "AboutPageComponent",
  components: {
    PerformanceChartComponent,
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      filteredChartData: [],
    };
  },
  mounted() {
    this.fetchChartData();
  },
  methods: {
    ...mapActions(["fetchChartData"]),
    fiterChartData(startDate, endDate) {
      const formateDateToInputFormat = (date) =>
        moment(date).format("YYYY-MM-DD");
      const filterChartData = this.getChartData.filter(({ date_ms }) =>
        moment(formateDateToInputFormat(date_ms)).isBetween(
          startDate,
          endDate,
          undefined,
          "[]"
        )
      );
      this.filteredChartData = filterChartData;
    },
    onClearDates() {
      this.startDate = null;
      this.endDate = null;
    },
  },
  computed: {
    ...mapGetters(["getChartData"]),
    onUpdateChartData() {
      if (this.startDate && this.endDate) {
        this.fiterChartData(this.startDate, this.endDate);
        return this.filteredChartData;
      } else {
        return this.getChartData;
      }
    },
  },
};
</script>
