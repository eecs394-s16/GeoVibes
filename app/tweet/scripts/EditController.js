angular
  .module('tweet')
  .controller("EditController", function ($scope, Tweet, supersonic) {
    $scope.tweet = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Tweet.find(steroids.view.params.id).then( function (tweet) {
      $scope.$apply(function() {
        $scope.tweet = tweet;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.tweet.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
