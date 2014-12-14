var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router()
var mongoose = require('mongoose');
var config = require('./app/config');
mongoose.connect(config.database);

app.set('jwtTokenSecret', config.jwtTokenSecret);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8889;

router.use(function(req, res, next) {
    console.log("[%s] %s", req.method, req.url)
    next();
});

//router = require('./app/routes/LoginRoutes.js')(router);
router = require('./app/routes/UserRoutes.js')(router);
router = require('./app/routes/MediaRoutes.js')(router);

app.use('/', router);

app.listen(port);

console.log('Server listening on port ' + port);