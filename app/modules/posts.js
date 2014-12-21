var Post = require('../models/post.js');
var Utils = require('../modules/Utils.js');

module.exports = {
    create: function() {
        return function(req, res) {
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