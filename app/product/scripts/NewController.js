angular
  .module('product')
  .controller("NewController", function ($scope, Product, supersonic) {
    $scope.product = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newproduct = new Product($scope.product);
      newproduct.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });