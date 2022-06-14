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
  // load more config
  homePageVm.page = null;
  homePageVm.isLoading = false;
  homePageVm.totalPages = null;
  homePageVm.handleLoadMoreEmployees = function () {
    homePageVm.isLoading = true;
    loadMoreEmployees(homePageVm.page + 1);
  };
  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.page = data.current_page;
        homePageVm.totalPages = data.pages;
        homePageVm.isLoading = false;
        homePageVm.isMoreData = false;
      }).catch(err=>console.log('Server err', err));
  }
  function loadMoreEmployees(page) {
    Employees.loadMoreEmployees(page)
      .then(({ data }) => {
        homePageVm.page = data.current_page;
        homePageVm.totalPages = data.pages;
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.isLoading = false;
        if (data.current_page === data.pages) {
          homePageVm.isMoreData = true;
        }
      });
  }
}
