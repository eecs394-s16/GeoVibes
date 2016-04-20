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
        //process your data here
        dataJSON = JSON.parse(data);
       // document.getElementById('aaa').innerHTML = 'tweets: '+dataJSON.statuses;
       console.info(dataJSON);
       moveDataToDatabase(dataJSON);
      });

    }


    function moveDataToDatabase(result){
        var Tweet = supersonic.data.model('Tweet');
        for(var i = 0; i < result.statuses.length; i++)
        {
          var tweetObj = {
            city : "N/A",
            content : result.statuses[i].text,
            id : "",
            latitude : "N/A",
            longitude : "N/A",
            sentiment : "N/A",
            state : "N/A",
            username : result.statuses[i].user.name
          }
          var finalTweet = new Tweet(tweetObj);
          finalTweet.save().then(function(){
            console.info("insert the data: " + tweetObj.text);
          });

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
          tweets = getTweetsFromLocation(name);
          tweets = JSON.stringify(tweets);
    		  document.getElementById("aaa").innerHTML = tweets + "";
    		  console.info("tweets:" + tweets);
    	  });

	  
   }
 });
