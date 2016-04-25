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

      steroids.device.getIPAddress({}, {
        onSuccess: function(message) {
          var Tweet = supersonic.data.model('Tweet');
          Tweet.findAll().then(function(allTweets){
            for(var i = 0; i < allTweets.length; i++)
            {
              // debugger;
              // if(allTweets[i]["requestId"] == message.ipAddress){
                allTweets[i].delete();
              // }
            }
            getTweetsFromLocation(query, message.ipAddress);
            initializeMap(position.coords.latitude, position.coords.longitude);
          });

        }
      });



    });
  };


  //uses Twitter API call to search for a place that the user has searched
  function getTweetsFromLocation(q, id){
    $.ajax({
      url: "https://fast-headland-78383.herokuapp.com/search/tweets?q="+q,
      type: "GET"
    }).done(function(data) {
      var tweets = JSON.parse(data);
      console.info(tweets);
      var tweetsString = JSON.stringify(tweets);

      analyzeTweets(tweets, id);

    });

  }


  function analyzeTweets(tweets, id) {
    var sum = 0;
    var numTweets = tweets.statuses.length;
    for(var i = 0; i < tweets.statuses.length; i++) {
      (function(tweetContent, tweetingUser){
        $.ajax({
          type: "POST",
          url: "http://text-processing.com/api/sentiment/",
          data: "text="+tweetContent
        }).done(function(data) {

          //MOVE TO DATABASE
          var Tweet = supersonic.data.model('Tweet');
          var tweetObj = {
            content : tweetContent,
            positivity_rating : data["probability"]["pos"],
            username : tweetingUser,
            requestId : id
          }
          sum = sum + data["probability"]["pos"];
          document.getElementById("aaa").innerHTML = ((sum / numTweets) * 100).toFixed(1) + "%";
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
    var rating = document.getElementById('rating');
    var mapProp = {
      center:userLoc,
      zoom:12,
      panControl:true,
      zoomControl:true,
      mapTypeControl:false,
      scaleControl:true,
       streetViewControl:true,
       overviewMapControl:true,
      rotateControl:true,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(rating);
    var input = document.getElementById("pac-input");
    var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);


    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      // setMapOnAll(null);
      markers = [];

      var name = places[0].name;

      steroids.device.getIPAddress({}, {
        onSuccess: function(message) {
          debugger;
          var Tweet = supersonic.data.model('Tweet');
          Tweet.findAll().then(function(allTweets){
            for(var i = 0; i < allTweets.length; i++)
            {
              // debugger;
              if(allTweets[i]["requestId"] == message.ipAddress){
                allTweets[i].delete();
              }
            }
            getTweetsFromLocation(name, message.ipAddress);
            // initializeMap(position.coords.latitude, position.coords.longitude);
          });
          // getTweetsFromLocation(query, message.ipAddress);
        }
      });

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();

      places.forEach(function(place) {
        var icon = new google.maps.Marker({
          position: place.geometry.location,
          map: map
        });

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
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
