import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import store from './store';
import PerformancePageComponent from './pages/performance-page.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';
import PerformanceFilterComponent from './components/vue-components/filter-input.vue';

angular.module('appModule', [
  'ui.router',
  'ngVue',
  'ngVue.plugins',
]);

angular.module('appModule').directive('vPerformancePage', (createVueComponent) => {
  return createVueComponent(Vue.component('performancePageComponent', PerformancePageComponent));
});

angular.module('appModule').directive('vPerformanceChart', (createVueComponent) => {
  return createVueComponent(Vue.component('performanceChartComponent', PerformanceChartComponent));
});

angular.module('appModule').directive('vPerformanceFilter', (createVueComponent) => {
  return createVueComponent(Vue.component('performanceFilterComponent', PerformanceFilterComponent));
});

// strict contextual escaping
angular.module('appModule').filter('trust', ['$sce', function ($sce) {
  return function (htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  };
}]);

// console.log('store', store);

angular.module('appModule')
  .config(($ngVueProvider) => {
    $ngVueProvider.setRootVueInstanceProps({
      store,
    });
  });
