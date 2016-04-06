angular
  .module('product')
  .controller("EditController", function ($scope, Product, supersonic) {
    $scope.product = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Product.find(steroids.view.params.id).then( function (product) {
      $scope.$apply(function() {
        $scope.product = product;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.product.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
