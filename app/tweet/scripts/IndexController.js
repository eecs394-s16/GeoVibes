
// var Index = angular.module('tweet',['supersonic']);
// Index.controller("IndexController", function ($scope, supersonic) {

//     var test;
//     var Tweet = supersonic.data.model("Tweet");
//     console.info("bbb" );

    
//           Tweet.all().whenChanged( function (allTweets) {
//             steroids.device.getIPAddress({}, {
//                 onSuccess: function(message) {
//                 test = "<ul>";
//                 for(var t = 0; t < allTweets.length; t++){
//                     if(allTweets[t]["requestId"] == message.ipAddress)
//                     test += "<li>"+allTweets[t]["username"] + ": " + allTweets[t]["content"] + "</li><hr>";
//                 }
//                 test += "</ul>";
//                 console.info("aaa" +allTweets);
//                 document.getElementById("aaaa").innerHTML = test;
//             }
//         });
       
//       });
    
//   });
var Index = angular.module('tweet',['supersonic']);
Index.controller("IndexController", function ($scope, supersonic) {

    var test;
    var Tweet = supersonic.data.model("Tweet");
    Tweet.all().whenChanged( function (allTweets) {
        steroids.device.getIPAddress({}, {
            onSuccess: function(message) {
              test = "<ul>";
                for(var t = 0; t < allTweets.length; t++){
                    if(allTweets[t]["requestId"] == message.ipAddress){
                        test += "<li><strong>"+allTweets[t]["username"] + ": " + "</strong>" + allTweets[t]["content"] + "</li><hr>";
                    }
                    
                }
                test += "</ul>";
                        console.info("aaa" +allTweets);
                        document.getElementById("aaaa").innerHTML = test;
            }
          });
        
    
    });
  });