var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

router.use(express.static('public'));

router.get( '/users/:name', function(req, res, next){
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  console.log(list);
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list } );
});

router.get( '/tweet/:uniqID', function(req, res, next){
  var uniqID = Number(req.params.uniqID);
  var list = tweetBank.find( {uniqID: uniqID} );
  res.render( 'index', { title: 'Twitter.js — Tweet by '+ list[0].name, tweets: list } );
});

module.exports = router;