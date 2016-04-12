var express = require('express'),
  app = express(),
  Twitter = require('twitter'),
  config = require('./config.js'),
  OAuth = require('oauth'),
  t = {test:'hi'};

  var port = process.env.PORT || 8000;

  // //Get this data from your twitter apps dashboard
  // var client = new Twitter({
  //     "consumerKey": config.consumerKey,
  //     "consumerSecret": config.consumerSecret,
  //     "accessToken": config.accessToken,
  //     "accessTokenSecret": config.accessTokenSecret,
  //     "callBackUrl": "http://placeholder.com"
  // });
 
  // var params = {screen_name: 'elicohen2018'};

  // client.get('statuses/user_timeline', params, function(error, tweets, response){
  //   if (!error) {
  //     console.log(tweets);
  //     t = tweets;
  //   } else {
  //     console.log(error);
  //   }
  // });



  app.get('/',function(req,res){

    var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      config.consumerKey,
      config.consumerSecret,
      '1.0A',
      null,
      'HMAC-SHA1'
    );

    oauth.get(
      'https://api.twitter.com/1.1/geo/search.json?query=Evanston',
      config.accessToken, //test user token
      config.accessTokenSecret, //test user secret            
      function (e, data, result){
        if (e) console.error(e);   
        res.json(data);
        console.log(data);   
        // console.log(require('util').inspect(data));    
      });
  })

  app.listen(port);