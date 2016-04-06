var GeoVibesApp = angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
]);

GeoVibesApp.controller('HomeController', function($scope, supersonic) {

    $scope.geoVibesTitle = "GeoVibes";


     function loadJSON() {   

         var xobj = new XMLHttpRequest();
         
         xobj.open("GET", 'http://tenaciousj.github.io/sampleTwitterEndpoint/sample-twitter-response.json', true);
         // $scope.json_test = "";
         xobj.onreadystatechange = function() {
          // document.getElementById("aaa").innerHTML = "12321232323232";
          if (xobj.readyState == 4 && xobj.status == "200"){
            var json = JSON.parse(xobj.responseText);
            document.getElementById("aaa").innerHTML = json["result"]["places"][0]["full_name"]+"";

            // $scope.json_test = json+"";
            // $scope.$apply();
          }
          else{
            $scope.json_test = "fail";
            // $scope.$apply();
            // document.getElementById("aaa").innerHTML = "12321";
          }
         }
         xobj.send();
         // $scope.$apply();
         // document.getElementById("aaa").innerHTML = "end";
       }


    function initializeMap() {
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
