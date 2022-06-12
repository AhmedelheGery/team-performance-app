import Vue from 'vue';
import Vuex from 'vuex';
import apiService from '../services/performance_chart';

Vue.use(Vuex);
/* eslint-disable no-undef */
export default new Vuex.Store({
  state: {
    chartData: [],
  },
  mutations: {
    setChartData(state, payload) {
      state.chartData = payload;
    },
  },
  actions: {
    fetchChartData({ commit }) {
      return new Promise((resolve, reject) => {
        apiService
          .getTeamPerformanceData()
          .then((data) => {
            resolve(data);
            commit('setChartData', data.data);
          })
          .catch((err) => {
            reject(err);
            console.log('err', err);
          });
      });
    },
  },
  getters: {
    getChartData(state) {
      return state.chartData;
    },
  },
});
