var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

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