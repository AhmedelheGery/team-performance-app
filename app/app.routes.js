angular
  .module('appModule')
  .config(($locationProvider) => {
    $locationProvider.html5Mode(false);
  })
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state({
        name: 'app',
        url: '/',
        templateUrl: './pages/home-page/home-page.html',
        controller: 'homeController',
        controllerAs: 'homePageVm',
      })
      .state({
        name: 'team-performance',
        url: '/team-performance',
        template: '<v-performance-page></v-performance-page>',
      })
      .state({
        name: 'error-page',
        url: '/404',
        template: '<v-error-page></v-error-page>',
      });
    $urlRouterProvider.otherwise(function ($injector, $location) {
      var state = $injector.get('$state');
      if ($location.path() === '') {
        state.go('app', { filter: '' });
      } else {
        state.go('error-page');
      }
      return $location.path();
    });
  });
