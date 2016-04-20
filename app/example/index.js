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
        url: "https://fast-headland-78383.herokuapp.com/search/tweets",
        type: "GET"
      }).done(function(data) {
        //process your data here
        dataJSON = JSON.parse(data);
       document.getElementById('aaa').innerHTML = 'tweets: '+dataJSON;
      });

    }

    function initializeMap(userLat, userLong) {
      // debugger;
      var legend = {
        "pos": "green",
        "neg": "red",
        "neutral": "gray",
      };

      var Tweet = supersonic.data.model('Tweet');


   }

 });
