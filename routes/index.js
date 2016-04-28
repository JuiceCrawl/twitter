var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
});

router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: false }));

router.get( '/users/:name', function(req, res, next){
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  console.log(list);
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, name: name, tweets: list, showForm: true } );
});

router.get( '/tweet/:uniqID', function(req, res, next){
  var uniqID = Number(req.params.uniqID);
  var list = tweetBank.find( {uniqID: uniqID} );
  res.render( 'index', { title: 'Twitter.js — Tweet by '+ list[0].name, tweets: list } );
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = router;