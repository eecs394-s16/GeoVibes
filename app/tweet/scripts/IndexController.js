
var Index = angular.module('tweet',['supersonic']);
Index.controller("IndexController", function ($scope, supersonic) {

    var test;
    var Tweet = supersonic.data.model("Tweet");


    steroids.device.getIPAddress({}, {
        onSuccess: function(message) {
          Tweet.all({requestId:message.ipAddress}).whenChanged( function (allTweets) {
            test = "<ul>";
            for(var t = 0; t < allTweets.length; t++){
                test += "<li>"+allTweets[t]["username"] + ": " + allTweets[t]["content"] + "</li><hr>";
            }
            test += "</ul>";
            console.info("aaa" +allTweets);
            document.getElementById("aaaa").innerHTML = test;
        });
        }
      });
    
  });