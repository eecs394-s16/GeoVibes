angular
  .module('tweet')
  .controller("IndexController", function ($scope, Tweet, supersonic) {
    $scope.tweets = null;
    $scope.showSpinner = true;

    Tweet.all().whenChanged( function (tweets) {
        $scope.$apply( function () {
          $scope.tweets = tweets;
          $scope.showSpinner = false;
        });
    });
  });