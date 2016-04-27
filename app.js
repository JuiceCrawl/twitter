var express = require('express'),
       http = require('http'),
      chalk = require('chalk'),
     morgan = require('morgan'),
       swig = require('swig'),

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

//integrate view engine, swig
app.engine('html',swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

app.use(morgan('tiny'));

app.use(/\/special.*/, function(req, res, next){
  console.log(chalk.yellow("You are special"));
  next();
});

app.get('/',function(req, res){
  var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
res.render( 'index', {title: 'Hall of Fame', people: people} );
});

app.get('/news',function(req, res){
  res.send('Today is Wednesday. We are at Grace Hopper Academy');
});

server.listen(port, function(){
  console.log("Listening on port "+ port);
});
