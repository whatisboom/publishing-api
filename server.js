var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var config = require('./app/config');
mongoose.connect(config.database);

app.use(bodyParser.json());

var port = process.env.PORT || 8889;

require('./app/routes/UserRoutes.js')(app);

app.listen(port);