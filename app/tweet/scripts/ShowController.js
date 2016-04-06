angular
  .module('tweet')
  .controller("ShowController", function ($scope, Tweet, supersonic) {
    $scope.tweet = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Tweet.find($scope.dataId).then( function (tweet) {
        $scope.$apply( function () {
          $scope.tweet = tweet;
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
      $scope.tweet.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });