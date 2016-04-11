var GeoVibesApp = angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
]);

GeoVibesApp.controller('HomeController', function($scope, supersonic) {

    google.maps.event.addDomListener(window, 'load', getUserLocation);

    $scope.geoVibesTitle = "GeoVibes";


    function getUserLocation(){
      supersonic.device.geolocation.getPosition().then( function(position) {
        var result = {"latitude": position.coords.latitude, "longitude": position.coords.longitude};
        var query = "";
        getTweetsFromLocation(query, position.coords.latitude, position.coords.longitude, result);
        initializeMap(position.coords.latitude, position.coords.longitude);
      });
    };

    //uses Twitter API call to search for a place that the user has searched
    function getTweetsFromLocation(q, lat, longi, result){
      if(lat == "0" && long == "0"){
        //make database call to get most recent location
        //lat = 
        //long =
      }

      var xobj = new XMLHttpRequest();
      var url = "https://api.twitter.com/1.1/search/tweets.json?q=" +
                encodeURI(q) +
                "&lat="+
                lat +
                "&long="+
                longi;
         
      xobj.open("GET", url, true);
     
      xobj.onreadystatechange = function() {
       if (xobj.readyState == 4 && xobj.status == "200"){
         var json = JSON.parse(xobj.responseText);
         getTweetContentSentiment(json, result);       
       }
       else{
        console.log("Error in getTweetsFromLocation");
        console.log("xobj.status = " + xobj.status);
       }
      }
      xobj.send();
    };

    function getTweetContentSentiment(json, result){
      var tweets = [];
      var statuses = json["statuses"];
      for(var s = 0; s < statuses.length; s++){
        var userName = statuses[s]["user"]["name"];
        var tweetContent = statuses[s]["text"];
        var sentiment;

        //get sentiment of tweet
        var xobj = new XMLHttpRequest();
        var url = "http://text-processing.com/api/sentiment/";
        xobj.onreadystatechange = function() {
          if (xobj.readyState == 4 && xobj.status == 200) {
            var json = JSON.parse(xobj.responseText);
            sentiment = json["label"];
          }
          else{
            sentiment = "neutral";
          }
        };
        xobj.open("POST", url, true);
        xobj.send("text=" + tweetContent);
        tweets.push({"user_name": userName, "tweet_content": tweetContent, "sentiment": sentiment});
      }
      result["tweets"] = tweets;
      moveDataToDatabase(result);

    };

    function moveDataToDatabase(result){

      for(var r = 0; r < result["tweets"].length; r++){
        var curr = result["tweets"][r];
        var tweetObj = {
          city: "N/A",
          content: curr["tweet_content"],
          latitude: result["latitude"],
          longitude: result["longitude"],
          sentiment: curr["sentiment"],
          state: "N/A",
          username: curr["user_name"],
        };
        var Tweet = supersonic.data.model('Tweet');
        var finalTweet = new Tweet(tweetObj);
        finalTweet.save().then(function(){
          console.log("Tweet object for " + tweetObj[username] + " successfully created!");
        });
      }


    };

    function initializeMap(userLat, userLong) {

      var legend = {
        "positive": "green",
        "negative": "red",
        "neutral": "gray",
      };

      var Tweet = supersonic.data.model('Tweet');
      Tweet.findAll().then(function(tweets){

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);

        var userLoc = new google.maps.LatLng(userLat,userLong);

        //sets center to be user location
        var mapProp = {
          center:userLoc,
          zoom:10,
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

        for(var t = 0; t < tweets.length; t++){
          var latLongPair = new google.maps.LatLng(tweets[t]["latitude"],tweets[t]["longitude"]);
          var location = new google.maps.Circle({
            center:latLongPair,
            radius:5,
            strokeColor:legend[tweets[t]["sentiment"]],
            strokeOpacity:0.8,
            strokeWeight:2,
            fillColor:legend[tweets[t]["sentiment"]],
            fillOpacity:0.4
          });

          var infowindow = new google.maps.InfoWindow({
            content:tweets[t]["content"]
          });

          google.maps.event.addListener(location, 'click', function(ev){
              infowindow.setPosition(ev.latLng);
              infowindow.open(map);
          });

        }

    });
  };
          
      
   
  

  });
