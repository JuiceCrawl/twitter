var express = require('express'),
       http = require('http'),
      chalk = require('chalk'),
     morgan = require('morgan'),

        app = express(),
       port = 3000,

     server = http.createServer();

server.on('request',app);

// app.use(function(req, res, next){
//   console.log(chalk.magenta(req.method), chalk.cyan(req.path), chalk.gray(res.statusCode));
//   console.log(req);
//   next();
// });

//This does what the above function does ^
app.use(morgan('tiny'));

app.use(/\/special.*/, function(req, res, next){
  console.log(chalk.yellow("You are special"));
  next();
});

app.get('/',function(req, res){
  res.send('Hello World!');
});

app.get('/news',function(req, res){
  res.send('Today is Wednesday. We are at Grace Hopper Academy');
});

server.listen(port, function(){
  console.log("Listening on port "+ port);
});
