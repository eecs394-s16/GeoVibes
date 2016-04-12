var express = require('express'),
  app = express(),
  Twitter = require('twitter'),
  config = require('./config.js'),
  OAuth = require('oauth'),
  t = {test:'hi'};

  var port = process.env.PORT || 8000;

  app.get('/search/tweets',function(req,res){

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
      'https://api.twitter.com/1.1/search/tweets.json?q='+req.query.q,
      config.accessToken, //test user token
      config.accessTokenSecret, //test user secret
      function (e, data, result){
        if (e) console.error(e);
        res.status(200);
        res.addHeader("Access-Control-Allow-Origin","*");
        res.json(data);
        console.log(data);
        // console.log(require('util').inspect(data));
      }
    );
  });

  app.get('/geo/reverse_geocode',function(req,res){

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
      'https://api.twitter.com/1.1/geo/reverse_geocode.json?lat='+req.query.lat+'&long='+req.query.long,
      config.accessToken, //test user token
      config.accessTokenSecret, //test user secret
      function (e, data, result){
        if (e) console.error(e);
        res.status(200);
        res.addHeader("Access-Control-Allow-Origin","*");
        res.json(data);
        console.log(data);
        // console.log(require('util').inspect(data));
      }
    );
  });

  app.listen(port);
