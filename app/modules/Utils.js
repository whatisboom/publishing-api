var jwt = require('jwt-simple');
var configAuth = require('../config/auth.js');
var User = require('../models/user.js');

module.exports = {
    requireRole: function(role) {
        return function(req, res, next) {
            var user = req.user;
            if (!user) {
                res.sendStatus(401);
            }
            else if (user.role === role || user.role === 'admin') {
                next();
            }
            else {
                res.sendStatus(403);
            }
        };
    },
    restrictToOwn: function() {
        return function(req, res, next) {
            var user = req.user;
            var url = req.url;

            if (!user) {
                res.sendStatus(401);
            }

            if (user.role === 'admin') {
                next();
            }

            if (url.indexOf('/users') === 0) {
                var id = req.params.userId;
                if (id === user.id) {
                    next();
                }
            }

            res.sendStatus(403);

        }
    },
    isLoggedIn: function(req, res, next) {
        var clientToken = req.header('Authorization')
        if (clientToken) {
            try {
                var decoded = jwt.decode(clientToken.split(' ')[1], configAuth.jwtTokenSecret);
                if (decoded.exp <= Date.now()) {
                    res.end('Access token as expired', 401);
                }
                User.findOne({ email: decoded.email }, function(err, user) {
                    req.user = user;
                    return next();
                });
            }
            catch (err) {

                res.status(401).json({
                    meta: {
                        error: 'Invalid token'
                    }
                })
            }
        }
        else {
            if (req.path === '/login' || req.path === '/register') {
                return next();
            }
            else {
                res.status(401).json({
                    meta: {
                        error: 'Authentication is required'
                    }
                });
            }
        }
    },
    decodeBase64: function(base64string) {
        var matches = base64string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var res = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        res.type = matches[1];
        res.data = new Buffer(matches[2], 'base64');
        return res;
    },
    error: function(statusCode, content) {
        return {
            meta: {
                error: {
                    code: code,
                    message: content
                }
            }
        };
    }
};