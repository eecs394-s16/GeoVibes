var GeoVibesApp = angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
]);

GeoVibesApp.controller('HomeController', function($scope, supersonic) {

    $scope.geoVibesTitle = "GeoVibes";


    function getUserLocation(){
      supersonic.device.geolocation.getPosition().then( function(position) {
          getTweetsReverseGeo(position.coords.latitude, position.coords.longitude);
      });
    };


    //uses Twitter API call reverse geo to center map based on user's location
    function getTweetsReverseGeo(latitude, longitude){
      var xobj = new XMLHttpRequest();
      var url = "https://api.twitter.com/1.1/geo/reverse_geocode.json?lat=" +
                latitude +
                "&long=" +
                longitude;
         
      xobj.open("GET", url, true);
     
      xobj.onreadystatechange = function() {
       if (xobj.readyState == 4 && xobj.status == "200"){
         var json = JSON.parse(xobj.responseText);
         initializeMap(json);
       }
       else{
        console.log("Error in getTweetsReverseGeo");
        console.log("xobj.status = " + xobj.status);
       }
      }
      xobj.send();

    };

    //uses Twitter API call geo search to search for a place based on user search input
    function getTweetsGeoSearch(place){
      var xobj = new XMLHttpRequest();
      var url = "https://api.twitter.com/1.1/geo/search.json?query="+place;
         
      xobj.open("GET", url, true);
     
      xobj.onreadystatechange = function() {
       if (xobj.readyState == 4 && xobj.status == "200"){
         var json = JSON.parse(xobj.responseText);
       }
       else{
        console.log("Error in getTweetsGeoSearch");
        console.log("xobj.status = " + xobj.status);
       }
      }
      xobj.send();

    };


    //uses Twitter API call to search for a place that the user has searched
    function getTweetsFromLocation(q, lat, longi){
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
       }
       else{
        console.log("Error in getTweetsFromLocation");
        console.log("xobj.status = " + xobj.status);
       }
      }
      xobj.send();
    };




    // function loadJSON() {   

    //      var xobj = new XMLHttpRequest();
         
    //      xobj.open("GET", 'http://tenaciousj.github.io/sampleTwitterEndpoint/sample-twitter-response.json', true);
    //      // $scope.json_test = "";
    //      xobj.onreadystatechange = function() {
    //       // document.getElementById("aaa").innerHTML = "12321232323232";
    //       if (xobj.readyState == 4 && xobj.status == "200"){
    //         var json = JSON.parse(xobj.responseText);
    //         document.getElementById("aaa").innerHTML = json["result"]["places"][0]["full_name"]+"";

    //         // $scope.json_test = json+"";
    //         // $scope.$apply();
    //       }
    //       else{
    //         $scope.json_test = "fail";
    //         // $scope.$apply();
    //         // document.getElementById("aaa").innerHTML = "12321";
    //       }
    //      }
    //      xobj.send();
    //      // $scope.$apply();
    //      // document.getElementById("aaa").innerHTML = "end";
    // }

    function initializeMap(json) {

      getUserLocation();


      // loadJSON();
      var Tweet = supersonic.data.model('Tweet');
      document.getElementById("aaa").innerHTML = "end";
      // var query = {"city": "Evanston"};
      console.log("here!");
      Tweet.findAll().then(function(tweets){


        // //neighborhoods of chicago
        // var chicago=new google.maps.LatLng(41.9436,-87.6584);
        // var lakeview=new google.maps.LatLng(41.9436,-87.6584);
        // var uptown=new google.maps.LatLng(41.9665,-87.6533);
        // var evanston=new google.maps.LatLng(42.0451,-87.6877);
        // var wickerpark=new google.maps.LatLng(41.9088,-87.6796);
        // var streeterville=new google.maps.LatLng(41.8927,-87.6200);
        var streeterville =new google.maps.LatLng(tweets[0]["latitude"],tweets[0]["longitude"]);
        var lakeview=new google.maps.LatLng(tweets[1]["latitude"],tweets[1]["longitude"]);
        var uptown=new google.maps.LatLng(tweets[2]["latitude"],tweets[2]["longitude"]);
        var evanston=new google.maps.LatLng(tweets[3]["latitude"],tweets[3]["longitude"]);
        var wickerpark=new google.maps.LatLng(tweets[4]["latitude"],tweets[4]["longitude"]);
         var chicago=new google.maps.LatLng(tweets[4]["latitude"],tweets[4]["longitude"]);
        var mapProp = {
          center:chicago,
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
          // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);


        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
		
		// Bias the SearchBox results towards current map's viewport.
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
          markers = [];

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
		
		
        var lakeviewcirc = new google.maps.Circle({
        center:lakeview,
        radius:300,
        strokeColor:"yellow",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"yellow",
        fillOpacity:0.4
      });
          var uptowncirc = new google.maps.Circle({
        center:uptown,
        radius:300,
        strokeColor:"orange",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"orange",
        fillOpacity:0.4
      });
           var evanstoncirc = new google.maps.Circle({
        center:evanston,
        radius:300,
        strokeColor:"purple",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"purple",
        fillOpacity:0.4
      });
           var wickerparkcirc = new google.maps.Circle({
        center:wickerpark,
        radius:300,
        strokeColor:"turquoise",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"turquoise",
        fillOpacity:0.4
      });
          var streetervillecirc = new google.maps.Circle({
        center:streeterville,
        radius:300,
        strokeColor:"red",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"red",
        fillOpacity:0.4
      });
          lakeviewcirc.setMap(map);
          uptowncirc.setMap(map);
          evanstoncirc.setMap(map);
          wickerparkcirc.setMap(map);
          streetervillecirc.setMap(map);
          
          var infowindow = new google.maps.InfoWindow({
        content:"#timeoutchicago"
        });

      google.maps.event.addListener(lakeviewcirc, 'click', function(ev){
          infowindow.setPosition(ev.latLng);
          infowindow.open(map);
      });
          google.maps.event.addListener(uptowncirc, 'click', function(ev){
          infowindow.setPosition(ev.latLng);
          infowindow.open(map);
      });
          google.maps.event.addListener(evanstoncirc, 'click', function(ev){
          infowindow.setPosition(ev.latLng);
          infowindow.open(map);
      });
          google.maps.event.addListener(wickerparkcirc, 'click', function(ev){
          infowindow.setPosition(ev.latLng);
          infowindow.open(map);
      });
           google.maps.event.addListener(streetervillecirc, 'click', function(ev){
          infowindow.setPosition(ev.latLng);
          infowindow.open(map);
      });
    });
  }
          
      google.maps.event.addDomListener(window, 'load', initializeMap);
   
  

  });
