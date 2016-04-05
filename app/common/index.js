var GeoVibesApp = angular.module('common', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
]);

//Define Routing for app
GeoVibesApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapController'
      }).
      otherwise({
        redirectTo: '/map'
      });
}]);

GeoVibesApp.controller('MapController', function($scope){

});