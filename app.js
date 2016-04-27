var express = require('express');
var http = require('http');
var app = express();
var port = 3000;

var server = http.createServer();

server.on('request',app);

app.get('/',function(req, res){
  res.send('Hello World!');
});

server.listen(port, function(){
  console.log("Listening on port "+ port);
});
