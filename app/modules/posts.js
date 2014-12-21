var Post = require('../models/post.js');
var Utils = require('../modules/Utils.js');

module.exports = {
    create: function() {
        return function(req, res) {
            var results = [];
            var payload = req.body.data.posts;

            for (var i = payload.length - 1; i >= 0; i--) {
                var post = payload[i];
            };

            res.status(501).json(Utils.error(501, "Not yet implemented."));
        }
    },
    read: function() {
        return function(req, res) {
            res.status(501).json(Utils.error(501, "Not yet implemented."));
        }
    },
    update: function() {
        return function(req, res) {
            res.status(501).json(Utils.error(501, "Not yet implemented."));
        }
    },
    delete: function() {
        return function(req, res) {
            res.status(501).json(Utils.error(501, "Not yet implemented."));
        }
    },
}