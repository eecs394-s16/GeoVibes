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
        var query = "evanston";
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
      // var url = "https://glacial-gorge-33330.herokuapp.com/search/tweets";
      var url = "https://tenaciousj.github.io/sampleTwitterEndpoint/tweets.json";//?" + "geocode=" + lat +"," + longi + "," + "50mi";
       // var url = "https://fast-headland-78383.herokuapp.com/search/tweets";  
      xobj.open('GET', url, true);
     console.info("ssss" +xobj.status);
      xobj.onreadystatechange = function() {

       // document.getElementById('aaa').innerHTML = ''+xobj.status+xobj.responseText;
       if (xobj.readyState == 4 && xobj.status == "200"){

         var json = JSON.parse(xobj.responseText);
         getTweetContentSentiment(json, result);       
       }
       else{
        console.log("Error in getTweetsFromLocation");
        console.log("xobj.status = " + xobj.status);
        console.log("response:" + xobj.responseText);
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
        if(r%2 == 0)
        {
          lat =  42.052844 + 0.02 *Math.random();
          longi = -87.678484 - 0.02 *Math.random();
        }
        else
        {
          lat =  42.052844 - 0.02 *Math.random();
          longi = -87.678484 - 0.02 *Math.random();
        }
        var temp = Math.random();
        var var3 = "";
        if (temp  < 0.4)
          var3 = "neutral";
        else if(temp > 0.6)
          var3 = "positive";
        else
          var3 = "negative";
        var curr = result["tweets"][r];
        var tweetObj = {
          city: "Evanston",
          content: curr["tweet_content"],
          latitude: lat,
          longitude: longi,
          // sentiment: curr["sentiment"],

          sentiment: var3,
          state: "IL",
          username: curr["user_name"],
        };
        var Tweet = supersonic.data.model('Tweet');
        var finalTweet = new Tweet(tweetObj);
        finalTweet.save().then(function(){
          console.log("Tweet object for " + tweetObj[username] + " successfully created!");
        });
      }
      var Tweet = supersonic.data.model('Tweet');
      var var1 = 42.052090 + 0.01 ;//* Math.random();
      var var2 =  -87.666190 + 0.01;// *Math.random();
      var tweetObj = {
        city: "Evanston",
        content: "hello",
        latitude: var1,// 42.052090 ,
        longitude: var2,// -87.666190 , 
        sentiment: "positive",
        // sentiment: "negative",
        state: "IL",
        username: "user1",
      };
        
      var finalTweet = new Tweet(tweetObj);
      finalTweet.save().then(function(){
        console.log("Tweet object for " + tweetObj[username] + " successfully created!");
      });
      
      

    };

    function initializeMap(userLat, userLong) {

      var legend = {
        "positive": "green",
        "negative": "red",
        "neutral": "gray",
      };

      var Tweet = supersonic.data.model('Tweet');
      Tweet.findAll().then(function(tweets)
      {
        for(var i = 0; i < tweets.length; i++)
        {
          tweets[i].delete().then(function(){
            console.log("delete" + i);
          });
        }

      });
      Tweet.findAll().then(function(tweets){

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        var LgdIcon = document.getElementById('LegendIcon');

        var userLoc = new google.maps.LatLng(userLat,userLong);

        //sets center to be user location
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

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
          
         // Listen for the event fired when the user selects a prediction and retrieve
         // more details for that place.
         searchBox.addListener('places_changed', function() {
           var places = searchBox.getPlaces();

           if (places.length == 0) {
             return;
           }

           // For each place, get the icon, name and location.
           var bounds = new google.maps.LatLngBounds();
           places.forEach(function(place) {
             var icon = {
               url: place.icon,
               size: new google.maps.Size(71, 71),
               origin: new google.maps.Point(0, 0),
               anchor: new google.maps.Point(17, 34),
               scaledSize: new google.maps.Size(25, 25)
             };

             if (place.geometry.viewport) {
               // Only geocodes have viewport.
               bounds.union(place.geometry.viewport);
             } else {
               bounds.extend(place.geometry.location);
             }
           });
           map.fitBounds(bounds);
         });

          
          
        console.info(tweets.length + "circle");
        for(var t = 0; t < tweets.length; t++){

          debugger;
          var latLongPair = new google.maps.LatLng(tweets[t]["latitude"],tweets[t]["longitude"]);
          var location = new google.maps.Circle({

            center:latLongPair,
            radius:100,
            strokeColor:legend[tweets[t]["sentiment"]],
            strokeOpacity:0.8,
            strokeWeight:2,
            fillColor:legend[tweets[t]["sentiment"]],
            fillOpacity:0.4
          });
          location.setMap(map);

          // document.getElementById("aaa").innerHTML = tweets[0]["content"];

          var infowindow = new google.maps.InfoWindow();

          var tweetContent = tweets[t]["username"] + " said:<br>" + "'"+ tweets[t]["content"] + "'"; 

          google.maps.event.addListener(location,'click', (function(location,content,infowindow,latLongPair){ 
              return function() {
                  infowindow.setContent(content);
                  infowindow.setPosition(latLongPair);
                  infowindow.open(map);
              };
          })(location,tweetContent,infowindow, latLongPair));
        }
        
    });


  };
          
      
   
  

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
