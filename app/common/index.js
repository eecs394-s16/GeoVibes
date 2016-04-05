var GeoVibesApp = angular.module('common', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
]);

//Define Routing for app
GeoVibesApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'views/layout.html',
        controller: 'HomeController'
      }).
      otherwise({
        redirectTo: '/home'
      });
}]);

GeoVibesApp.controller('HomeController', function($scope){
	//test
});