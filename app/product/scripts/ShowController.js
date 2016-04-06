angular
  .module('product')
  .controller("ShowController", function ($scope, Product, supersonic) {
    $scope.product = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Product.find($scope.dataId).then( function (product) {
        $scope.$apply( function () {
          $scope.product = product;
          $scope.showSpinner = false;
        });
      });
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.product.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });