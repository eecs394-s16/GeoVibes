
var Index = angular.module('tweet',['supersonic']);
Index.controller("IndexController", function ($scope, supersonic) {

    var test;
    var Tweet = supersonic.data.model("Tweet");
    Tweet.all().whenChanged( function (allTweets) {
        test = "<ul>";
        for(var t = 0; t < allTweets.length; t++){
            test += "<li><strong>"+allTweets[t]["username"] + ": " + "</strong>" + allTweets[t]["content"] + "</li><hr>";
    
  });