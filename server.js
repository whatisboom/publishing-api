var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
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

router.use(Utils.isLoggedIn);
router.use(function(req, res, next) {
    console.log("[%s] %s", req.method, req.url)
    next();
});

app.use(passport.initialize());

require('./app/routes/UserRoutes.js')(router, passport);
require('./app/routes/MediaRoutes.js')(router, passport);

app.use('/', router);

app.listen(port);

console.log('Server listening on port ' + port);