﻿var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var db = require('./config/database');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

mongoose.connect(db.getConnectUrl());
require('./config/passport')(passport);

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'uraaninaiiaiaiaiaiaain' }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
