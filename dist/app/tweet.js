angular.module('tweet', [
  /* Declare any module-specific dependencies here */
  'common'
]);
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


var Index = angular.module('tweet',['supersonic']);
Index.controller("IndexController", function ($scope, supersonic) {

    var test;
    var Tweet = supersonic.data.model("Tweet");
//     Tweet.findAll().then(function(allTweets){
//         test = "<ul>";
//         for(var t = 0; t < allTweets.length; t++){
// //            $scope.tweets.push(allTweets[t]["content"] + allTweets[t]["username"]);
//             test += "<li>"+allTweets[t]["username"] + ": " + allTweets[t]["content"] + "</li><hr>";
//         }
//         test += "</ul>";
//         console.info("aaa" +allTweets);
//         document.getElementById("aaaa").innerHTML = test;
//     });
    Tweet.all().whenChanged( function (allTweets) {
        test = "<ul>";
        for(var t = 0; t < allTweets.length; t++){
//            $scope.tweets.push(allTweets[t]["content"] + allTweets[t]["username"]);
            test += "<li><strong>"+allTweets[t]["username"] + ": " + "</strong>" + allTweets[t]["content"] + "</li><hr>";
        }
        test += "</ul>";
        console.info("aaa" +allTweets);
        document.getElementById("aaaa").innerHTML = test;
    });
  });
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
angular
  .module('tweet')
  .constant('Tweet', supersonic.data.model('Tweet'));