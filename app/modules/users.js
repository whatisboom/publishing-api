var User = require('../models/user.js');
var authConfig = require('../config/auth.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var Utils = require('../modules/Utils.js');
var extend = require('extend');

module.exports = {
    login: function(passport) {
        return function(req, res, next) {

            passport.authenticate('local', function(err, user, info) {
                console.log(info);
                if (err) { return next(err); }
                if (!user) {
                    return res.status(401).json( 
                        { 
                            meta: {
                                error: 'User not found.'
                            }
                        }
                    );
                }

                var token = jwt.encode({
                    exp: moment().add(7, 'days').valueOf(),
                    email: user.email
                }, authConfig.jwtTokenSecret);

                res.json({
                    meta: {
                        token: token
                    }
                });
            })(req, res, next);
            
        }
    },
    create: function(passport) {
        return passport.authenticate('local-signup', {
            session: false,
            successRedirect: '/dashboard',
            failureRedirect: '/register'
        });
    },
    read: function() {
        return function(req, res) {
            User.find(function(err, users) {
                if (err) {
                    res.status(500);
                }
                res.json({
                    meta: {
                        error: err
                    },
                    data: {
                        users: users
                    }
                })
            });
        }
    },
    readOne: function() {
        return function(req, res) {
            User.findById(req.params.userId, function(err, user) {
                if (err) {
                    res.status(500)
                }
                res.json({
                    meta: {
                        error: err
                    },
                    data: {
                        users: [user]
                    }
                })
            });
        }
    },
    update: function() {
        return function(req, res) {
            User.findById(req.params.userId, function(err, user) {
                if (err) {
                    res.status(500);
                }

                extend(user, req.body);

                user.save(function(err) {
                    if (err) {
                        res.status(500);
                    }

                    res.json({
                        data: {
                            users: [user]
                        }
                    })
                });
            });
        }
    },
    delete: function() {
        return function(req, res) {
            res.status(403).json({
                meta: {
                    error: 'No.'
                }
            })
        }
    }
}