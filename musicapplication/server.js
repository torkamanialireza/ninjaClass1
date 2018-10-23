
const express = require('express');
const app =  express();
const session = require('express-session');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000000000 }
}))
// app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/dist/public'));

// app.use(express.static(__dirname + '/public/src'));

require('./server/config/mongoose');
require('./server/config/routes')(app); 


app.listen(8000, ()=>console.log("music  website started"));


if(process.env.NODE_ENV !== 'production') {
  process.once('uncaughtException', function(err) {
    console.error('FATAL: Uncaught exception.');
    console.error(err.stack||err);
    setTimeout(function(){
      process.exit(1);
    }, 100);
  });
}