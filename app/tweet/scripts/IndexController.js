//angular
//  .module('tweet')
var Index = angular.module('tweet',['supersonic']);
Index.controller("IndexController", function ($scope, supersonic) {
//    $scope.tweets = ["hi"];
//    debugger;
//    $scope.showSpinner = true;

//    Tweet.all().whenChanged( function (tweets) {
//        $scope.$apply( function () {
//          $scope.tweets = tweets;
//          $scope.showSpinner = false;
//        });
    var test;
    var Tweet = supersonic.data.model("Tweet");
    Tweet.findAll().then(function(allTweets){
        test = "<ul>";
        for(var t = 0; t < allTweets.length; t++){
//            $scope.tweets.push(allTweets[t]["content"] + allTweets[t]["username"]);
            test += "<li>"+allTweets[t]["username"] + ": " + allTweets[t]["content"] + "</li><hr>";
        }
        test += "</ul>";
        console.info("aaa" +allTweets);
        document.getElementById("aaaa").innerHTML = test;
    });
  });