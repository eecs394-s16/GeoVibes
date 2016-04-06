angular.module('product', [
  /* Declare any module-specific dependencies here */
  'common'
]);
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
angular
  .module('product')
  .constant('Product', supersonic.data.model('Product'));
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