angular
  .module('tweet')
  .controller("NewController", function ($scope, Tweet, supersonic) {
    $scope.tweet = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newtweet = new Tweet($scope.tweet);
      newtweet.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });