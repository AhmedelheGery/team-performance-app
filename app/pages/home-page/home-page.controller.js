angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees, $location) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.queryStringValue = '';
  homePageVm.handleFilterEvent = (employees, queryString) => {
    homePageVm.employees = employees;
    return queryString ? $location.search('filter', queryString) : $location.search({});
  };
  if ($location.search().filter) {
    homePageVm.filterQueryString = $location.search().filter;
  }
  activate();
  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }
}
