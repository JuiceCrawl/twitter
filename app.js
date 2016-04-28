var express = require('express'),
       // http = require('http'),
      chalk = require('chalk'),
     morgan = require('morgan'),
       swig = require('swig'),
     routes = require('./routes/'),
        app = express(),
   socketio = require('socket.io'),
       port = 3000,
       server;
     // server = http.createServer();
         

//server.on('request', app);

//integrate view engine, swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

app.use(morgan('tiny'));

server = app.listen(port, function(){
  console.log("Listening on port "+ port);
});

var io = socketio.listen(server);

app.use('/', routes(io));
// or:
// var router = routes(io);
// app.use( '/', router );

