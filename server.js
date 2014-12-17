var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var morgan = require('morgan');
var configDB = require('./app/config/database.js');
var configAuth = require('./app/config/auth.js');
var Utils = require('./app/modules/Utils.js');
var port = process.env.PORT || 8889;

mongoose.connect(configDB.database);

require('./app/config/passport.js')(passport);

app.set('jwtTokenSecret', configAuth.jwtTokenSecret);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(Utils.isLoggedIn);
router.use(morgan('[:method] :url :status :response-time ms'));

app.use(passport.initialize());

require('./app/routes/UserRoutes.js')(router, passport);
require('./app/routes/MediaRoutes.js')(router, passport);

app.use('/', router);

app.listen(port);

console.log('Server listening on port ' + port);