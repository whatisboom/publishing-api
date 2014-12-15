var jwt = require('jwt-simple');
var configAuth = require('../config/auth.js');
var User = require('../models/user.js');

module.exports = {
    isLoggedIn: function(req, res, next) {
        var clientToken = req.header('authentication')
        if (clientToken) {
            try {
                var decoded = jwt.decode(clientToken.split(' ')[1], configAuth.jwtTokenSecret);
                if (decoded.exp <= Date.now()) {
                    res.end('Access token as expired', 400);
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
                console.log('wat')
                res.status(401).json({
                    meta: {
                        error: 'Authentication is required'
                    }
                });
            }
        }
    }
};