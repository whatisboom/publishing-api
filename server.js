var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var config = require('./app/config');
mongoose.connect(config.database);

app.use(bodyParser.json());

var port = process.env.PORT || 8889;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({
        meta: {
            message: "Working!"
        }
    })
});

app.use('/api', router);

app.listen(port);