angular
  .module('product')
  .controller("IndexController", function ($scope, Product, supersonic) {
    $scope.products = null;
    $scope.showSpinner = true;

    Product.all().whenChanged( function (products) {
        $scope.$apply( function () {
          $scope.products = products;
          $scope.showSpinner = false;
        });
    });
  });