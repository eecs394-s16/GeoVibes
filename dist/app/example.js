var GeoVibesApp = angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
]);

GeoVibesApp.controller('HomeController', function($scope, supersonic) {

    google.maps.event.addDomListener(window, 'load', getUserLocation);

    $scope.geoVibesTitle = "GeoVibes";

    function getUserLocation(){
      supersonic.device.geolocation.getPosition().then( function(position) {
        var query = "evanston";
        getTweetsFromLocation(query);
        initializeMap(position.coords.latitude, position.coords.longitude);
      });
    };
    

    //uses Twitter API call to search for a place that the user has searched
    function getTweetsFromLocation(q){
       $.ajax({
        url: "https://fast-headland-78383.herokuapp.com/search/tweets?q="+q,
        type: "GET"
      }).done(function(data) {
        var tweets = JSON.parse(data);
        console.info(tweets);
        var tweetsString = JSON.stringify(tweets);
        // document.getElementById("aaa").innerHTML = tweetsString;
        var Tweet = supersonic.data.model('Tweet');
        Tweet.findAll().then(function(allTweets){
          for(var i = 0; i < allTweets.length; i++)
          {
            allTweets[i].delete();
          }
        });
           analyzeTweets(tweets);
      });

    }

    function analyzeTweets(tweets) {
      for(var i = 0; i < tweets.statuses.length; i++) {
        (function(tweetContent, tweetingUser){
          $.ajax({
            type: "POST",
            url: "http://text-processing.com/api/sentiment/",
            data: "text="+tweetContent
          }).done(function(data) {

            //MOVE TO DATABASE
            var Tweet = supersonic.data.model('Tweet');
            document.getElementById("aaa").innerHTML = tweetContent;

            var tweetObj = {
              content : tweetContent,
              positivity_rating : data["probability"]["pos"],
              username : tweetingUser
            }

            var finalTweet = new Tweet(tweetObj);
            finalTweet.save().then(function(){
              console.info("insert the data: " + tweetObj.text);
            });

            
          });

        })(tweets.statuses[i].text, tweets.statuses[i].user.name);

      }
    }

        
    function initializeMap(userLat, userLong) {
      // debugger;
      var legend = {
        "pos": "green",
        "neg": "red",
        "neutral": "gray",
      };
      var userLoc = new google.maps.LatLng(userLat,userLong);
      var LgdIcon = document.getElementById('LegendIcon');
  	  var mapProp = {
           center:userLoc,
           zoom:12,
           panControl:true,
           zoomControl:true,
           mapTypeControl:true,
           scaleControl:true,
           streetViewControl:true,
           overviewMapControl:true,
           rotateControl:true,
           mapTypeId:google.maps.MapTypeId.ROADMAP
         };

       var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
       map.controls[google.maps.ControlPosition.RIGHT_TOP].push(LgdIcon);
    	  var input = document.getElementById("pac-input");
    	  var searchBox = new google.maps.places.SearchBox(input);
    	  
    	  searchBox.addListener('places_changed', function(){
    		  var places = searchBox.getPlaces();
          var name = places[0].name;
          getTweetsFromLocation(name);
    	  });

	  
   }
 });

angular
  .module('example')
  .controller('LearnMoreController', function($scope, supersonic) {

    $scope.navbarTitle = "Learn More";

  });

angular
  .module('example')
  .controller('SettingsController', function($scope, supersonic) {
    $scope.navbarTitle = "Settings";
  });
