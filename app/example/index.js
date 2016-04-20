var GeoVibesApp = angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
]);

GeoVibesApp.controller('HomeController', function($scope, supersonic) {


// if (typeof(module) !== 'undefined' && typeof(exports) !== 'undefined') {
//     module.exports = OAuth;
//     var CryptoJS = require("crypto-js");
// }

// /**
//  * Constructor
//  * @param {Object} opts consumer key and secret
//  */
// function OAuth(opts) {
//     if(!(this instanceof OAuth)) {
//         return new OAuth(opts);
//     }

//     if(!opts) {
//         opts = {};
//     }

//     if(!opts.consumer) {
//         throw new Error('consumer option is required');
//     }

//     this.consumer            = opts.consumer;
//     this.signature_method    = opts.signature_method || 'HMAC-SHA1';
//     this.nonce_length        = opts.nonce_length || 32;
//     this.version             = opts.version || '1.0';
//     this.parameter_seperator = opts.parameter_seperator || ', ';

//     if(typeof opts.last_ampersand === 'undefined') {
//         this.last_ampersand = true;
//     } else {
//         this.last_ampersand = opts.last_ampersand;
//     }

//     switch (this.signature_method) {
//         case 'HMAC-SHA1':
//             this.hash = function(base_string, key) {
//                 return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
//             };
//             break;

//         case 'HMAC-SHA256':
//             this.hash = function(base_string, key) {
//                 return CryptoJS.HmacSHA256(base_string, key).toString(CryptoJS.enc.Base64);
//             };
//             break;

//         case 'PLAINTEXT':
//             this.hash = function(base_string, key) {
//                 return key;
//             };
//             break;

//         case 'RSA-SHA1':
//             throw new Error('oauth-1.0a does not support this signature method right now. Coming Soon...');
//         default:
//             throw new Error('The OAuth 1.0a protocol defines three signature methods: HMAC-SHA1, RSA-SHA1, and PLAINTEXT only');
//     }
// }

// /**
//  * OAuth request authorize
//  * @param  {Object} request data
//  * {
//  *     method,
//  *     url,
//  *     data
//  * }
//  * @param  {Object} public and secret token
//  * @return {Object} OAuth Authorized data
//  */
// OAuth.prototype.authorize = function(request, token) {
//     var oauth_data = {
//         oauth_consumer_key: this.consumer.public,
//         oauth_nonce: this.getNonce(),
//         oauth_signature_method: this.signature_method,
//         oauth_timestamp: this.getTimeStamp(),
//         oauth_version: this.version
//     };

//     if(!token) {
//         token = {};
//     }

//     if(token.public) {
//         oauth_data.oauth_token = token.public;
//     }

//     if(!request.data) {
//         request.data = {};
//     }

//     oauth_data.oauth_signature = this.getSignature(request, token.secret, oauth_data);

//     return oauth_data;
// };

// /**
//  * Create a OAuth Signature
//  * @param  {Object} request data
//  * @param  {Object} token_secret public and secret token
//  * @param  {Object} oauth_data   OAuth data
//  * @return {String} Signature
//  */
// OAuth.prototype.getSignature = function(request, token_secret, oauth_data) {
//     return this.hash(this.getBaseString(request, oauth_data), this.getSigningKey(token_secret));
// };

// /**
//  * Base String = Method + Base Url + ParameterString
//  * @param  {Object} request data
//  * @param  {Object} OAuth data
//  * @return {String} Base String
//  */
// OAuth.prototype.getBaseString = function(request, oauth_data) {
//     return request.method.toUpperCase() + '&' + this.percentEncode(this.getBaseUrl(request.url)) + '&' + this.percentEncode(this.getParameterString(request, oauth_data));
// };

// /**
//  * Get data from url
//  * -> merge with oauth data
//  * -> percent encode key & value
//  * -> sort
//  *
//  * @param  {Object} request data
//  * @param  {Object} OAuth data
//  * @return {Object} Parameter string data
//  */
// OAuth.prototype.getParameterString = function(request, oauth_data) {
//     var base_string_data = this.sortObject(this.percentEncodeData(this.mergeObject(oauth_data, this.mergeObject(request.data, this.deParamUrl(request.url)))));

//     var data_str = '';

//     //base_string_data to string
//     for(var key in base_string_data) {
//         var value = base_string_data[key];
//         // check if the value is an array
//         // this means that this key has multiple values
//         if (value && Array.isArray(value)){
//           // sort the array first
//           value.sort();

//           var valString = "";
//           // serialize all values for this key: e.g. formkey=formvalue1&formkey=formvalue2
//           value.forEach((function(item, i){
//             valString += key + '=' + item;
//             if (i < value.length){
//               valString += "&";
//             }
//           }).bind(this));
//           data_str += valString;
//         } else {
//           data_str += key + '=' + value + '&';
//         }
//     }

//     //remove the last character
//     data_str = data_str.substr(0, data_str.length - 1);
//     return data_str;
// };

// /**
//  * Create a Signing Key
//  * @param  {String} token_secret Secret Token
//  * @return {String} Signing Key
//  */
// OAuth.prototype.getSigningKey = function(token_secret) {
//     token_secret = token_secret || '';

//     if(!this.last_ampersand && !token_secret) {
//         return this.percentEncode(this.consumer.secret);
//     }

//     return this.percentEncode(this.consumer.secret) + '&' + this.percentEncode(token_secret);
// };

// /**
//  * Get base url
//  * @param  {String} url
//  * @return {String}
//  */
// OAuth.prototype.getBaseUrl = function(url) {
//     return url.split('?')[0];
// };

// /**
//  * Get data from String
//  * @param  {String} string
//  * @return {Object}
//  */
// OAuth.prototype.deParam = function(string) {
//     var arr = string.split('&');
//     var data = {};

//     for(var i = 0; i < arr.length; i++) {
//         var item = arr[i].split('=');
//         data[item[0]] = decodeURIComponent(item[1]);
//     }
//     return data;
// };

// /**
//  * Get data from url
//  * @param  {String} url
//  * @return {Object}
//  */
// OAuth.prototype.deParamUrl = function(url) {
//     var tmp = url.split('?');

//     if (tmp.length === 1)
//         return {};

//     return this.deParam(tmp[1]);
// };

// /**
//  * Percent Encode
//  * @param  {String} str
//  * @return {String} percent encoded string
//  */
// OAuth.prototype.percentEncode = function(str) {
//     return encodeURIComponent(str)
//         .replace(/\!/g, "%21")
//         .replace(/\*/g, "%2A")
//         .replace(/\'/g, "%27")
//         .replace(/\(/g, "%28")
//         .replace(/\)/g, "%29");
// };

// /**
//  * Percent Encode Object
//  * @param  {Object} data
//  * @return {Object} percent encoded data
//  */
// OAuth.prototype.percentEncodeData = function(data) {
//     var result = {};

//     for(var key in data) {
//         var value = data[key];
//         // check if the value is an array
//         if (value && Array.isArray(value)){
//           var newValue = [];
//           // percentEncode every value
//           value.forEach((function(val){
//             newValue.push(this.percentEncode(val));
//           }).bind(this));
//           value = newValue;
//         } else {
//           value = this.percentEncode(value);
//         }
//         result[this.percentEncode(key)] = value;
//     }

//     return result;
// };

// /**
//  * Get OAuth data as Header
//  * @param  {Object} oauth_data
//  * @return {String} Header data key - value
//  */
// OAuth.prototype.toHeader = function(oauth_data) {
//     oauth_data = this.sortObject(oauth_data);

//     var header_value = 'OAuth ';

//     for(var key in oauth_data) {
//         if (key.indexOf('oauth_') === -1)
//             continue;
//         header_value += this.percentEncode(key) + '="' + this.percentEncode(oauth_data[key]) + '"' + this.parameter_seperator;
//     }

//     return {
//         Authorization: header_value.substr(0, header_value.length - this.parameter_seperator.length) //cut the last chars
//     };
// };

// /**
//  * Create a random word characters string with input length
//  * @return {String} a random word characters string
//  */
// OAuth.prototype.getNonce = function() {
//     var word_characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     var result = '';

//     for(var i = 0; i < this.nonce_length; i++) {
//         result += word_characters[parseInt(Math.random() * word_characters.length, 10)];
//     }

//     return result;
// };

// /**
//  * Get Current Unix TimeStamp
//  * @return {Int} current unix timestamp
//  */
// OAuth.prototype.getTimeStamp = function() {
//     return parseInt(new Date().getTime()/1000, 10);
// };

// ////////////////////// HELPER FUNCTIONS //////////////////////

// /**
//  * Merge object
//  * @param  {Object} obj1
//  * @param  {Object} obj2
//  * @return {Object}
//  */
// OAuth.prototype.mergeObject = function(obj1, obj2) {
//     var merged_obj = obj1;
//     for(var key in obj2) {
//         merged_obj[key] = obj2[key];
//     }
//     return merged_obj;
// };

// /**
//  * Sort object by key
//  * @param  {Object} data
//  * @return {Object} sorted object
//  */
// OAuth.prototype.sortObject = function(data) {
//     var keys = Object.keys(data);
//     var result = {};

//     keys.sort();

//     for(var i = 0; i < keys.length; i++) {
//         var key = keys[i];
//         result[key] = data[key];
//     }

//     return result;
// };













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
       document.getElementById('aaa').innerHTML = 'tweets: '+dataJSON.statuses;
       console.info(dataJSON);
       moveDataToDatabase(dataJSON);
      });

    }

      // var xobj = new XMLHttpRequest();
      // var url =
      // var url = "https://tenaciousj.github.io/sampleTwitterEndpoint/tweets.json";//?" + "geocode=" + lat +"," + longi + "," + "50mi";
       // var url = "https://fast-headland-78383.herokuapp.com/search/tweets";
    //   xobj.open('GET', url, true);
    //   console.info("ssss" +xobj.status);
    //   xobj.onreadystatechange = function() {
    //
    //    // document.getElementById('aaa').innerHTML = ''+xobj.status;//+xobj.responseText;
    //    if (xobj.readyState == 4 && xobj.status == "200"){
    //
    //      var json = JSON.parse(xobj.responseText);
    //      getTweetContentSentiment(json, result);
    //    }
    //    else{
    //     console.log("Error in getTweetsFromLocation");
    //     console.log("xobj.status = " + xobj.status);
    //     console.log("response:" + xobj.responseText);
    //    }
    //   }
    //   xobj.send();
    // };


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
        

      // if(r%2 == 0)
      //   {
      //     lat =  42.052844 + 0.02 *Math.random();
      //     longi = -87.678484 - 0.02 *Math.random();
      //   }
      //   else
      //   {
      //     lat =  42.052844 - 0.02 *Math.random();
      //     longi = -87.678484 - 0.02 *Math.random();
      //   }
      //   var temp = Math.random();

      //   if (temp  < 0.4)
      //     var3 = "neutral";
      //   else if(temp > 0.6)
      //     var3 = "pos";
      //   else
      //     var3 = "neg";

      //   var curr = result["tweets"][r];
      //   // var var3 = trySentiment(curr["tweet_content"]);
      //   var tweetObj = {
      //     city: "Evanston",
      //     content: curr["tweet_content"],
      //     latitude: lat,
      //     longitude: longi,
      //     // sentiment: curr["sentiment"],

      //     sentiment: var3,
      //     state: "IL",
      //     username: curr["user_name"],
      //   };
        
      //   finalTweet.save().then(function(){
      //     console.log("Tweet object for " + tweetObj[username] + " successfully created!");
      //   });

      // for(var r = 0; r < result["tweets"].length; r++){
      //   if(r%2 == 0)
      //   {
      //     lat =  42.052844 + 0.02 *Math.random();
      //     longi = -87.678484 - 0.02 *Math.random();
      //   }
      //   else
      //   {
      //     lat =  42.052844 - 0.02 *Math.random();
      //     longi = -87.678484 - 0.02 *Math.random();
      //   }
      //   var temp = Math.random();

      //   if (temp  < 0.4)
      //     var3 = "neutral";
      //   else if(temp > 0.6)
      //     var3 = "pos";
      //   else
      //     var3 = "neg";

      //   var curr = result["tweets"][r];
      //   // var var3 = trySentiment(curr["tweet_content"]);
      //   var tweetObj = {
      //     city: "Evanston",
      //     content: curr["tweet_content"],
      //     latitude: lat,
      //     longitude: longi,
      //     // sentiment: curr["sentiment"],

      //     sentiment: var3,
      //     state: "IL",
      //     username: curr["user_name"],
      //   };
      //   var Tweet = supersonic.data.model('Tweet');
      //   var finalTweet = new Tweet(tweetObj);
      //   finalTweet.save().then(function(){
      //     console.log("Tweet object for " + tweetObj[username] + " successfully created!");
      //   });
      // }
    }




    //   var Tweet = supersonic.data.model('Tweet');
    //   var var1 = 42.052090 + 0.01 ;//* Math.random();
    //   var var2 =  -87.666190 + 0.01;// *Math.random();
    //   var tweetObj = {
    //     city: "Evanston",
    //     content: "hello",
    //     latitude: var1,// 42.052090 ,
    //     longitude: var2,// -87.666190 ,
    //     sentiment: "pos",
    //     // sentiment: "negative",
    //     state: "IL",
    //     username: "user1",
    //   };

    //   var finalTweet = new Tweet(tweetObj);
    //   finalTweet.save().then(function(){
    //     console.log("Tweet object for " + tweetObj[username] + " successfully created!");
    //   });

    // };
      
    

    function initializeMap(userLat, userLong) {
      // debugger;
      var legend = {
        "pos": "green",
        "neg": "red",
        "neutral": "gray",
      };

      var Tweet = supersonic.data.model('Tweet');
      // Tweet.findAll().then(function(tweets)
      // {
      //   for(var i = 0; i < tweets.length; i++)
      //   {
      //     tweets[i].delete().then(function(){
      //       console.log("delete" + i);
      //     });
      //   }

      // });
    //   Tweet.findAll().then(function(tweets){
    //     // debugger;
    //     // Create the search box and link it to the UI element.
    //     var input = document.getElementById('pac-input');
    //     var searchBox = new google.maps.places.SearchBox(input);
    //     var LgdIcon = document.getElementById('LegendIcon');

    //     var userLoc = new google.maps.LatLng(userLat,userLong);

    //     //sets center to be user location
    //     var mapProp = {
    //       center:userLoc,
    //       zoom:12,
    //       panControl:true,
    //       zoomControl:true,
    //       mapTypeControl:true,
    //       scaleControl:true,
    //       streetViewControl:true,
    //       overviewMapControl:true,
    //       rotateControl:true,
    //       mapTypeId:google.maps.MapTypeId.ROADMAP
    //     };

    //     var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    //     map.controls[google.maps.ControlPosition.RIGHT_TOP].push(LgdIcon);

    //     // Bias the SearchBox results towards current map's viewport.
    //     map.addListener('bounds_changed', function() {
    //       searchBox.setBounds(map.getBounds());
    //     });

    //      // Listen for the event fired when the user selects a prediction and retrieve
    //      // more details for that place.
    //      searchBox.addListener('places_changed', function() {
    //        var places = searchBox.getPlaces();

    //        if (places.length == 0) {
    //          return;
    //        }

    //        // For each place, get the icon, name and location.
    //        var bounds = new google.maps.LatLngBounds();
    //        places.forEach(function(place) {
    //          var icon = {
    //            url: place.icon,
    //            size: new google.maps.Size(71, 71),
    //            origin: new google.maps.Point(0, 0),
    //            anchor: new google.maps.Point(17, 34),
    //            scaledSize: new google.maps.Size(25, 25)
    //          };

    //          if (place.geometry.viewport) {
    //            // Only geocodes have viewport.
    //            bounds.union(place.geometry.viewport);
    //          } else {
    //            bounds.extend(place.geometry.location);
    //          }
    //        });
    //        map.fitBounds(bounds);
    //      });



    //     console.info(tweets.length + "circle");
    //     for(var t = 0; t < tweets.length; t++){

    //       // debugger;
    //       var latLongPair = new google.maps.LatLng(tweets[t]["latitude"],tweets[t]["longitude"]);

    //       var var3 = trySentiment(tweets[t]["content"]);
    //       // tweets[t]["sentiment"] = var3;
    //       console.info("here123:" + var3);

    //     }
    //   });

    // }

   }
 });

          // var location = new google.maps.Circle({

          //   center:latLongPair,
          //   radius:100,
          //   strokeColor:legend[tweets[t]["sentiment"]],
          //   strokeOpacity:0.8,
          //   strokeWeight:2,
          //   fillColor:legend[tweets[t]["sentiment"]],
          //   fillOpacity:0.4
          // });
          // location.setMap(map);

          // // document.getElementById("aaa").innerHTML = tweets[0]["content"];

          // var infowindow = new google.maps.InfoWindow();

