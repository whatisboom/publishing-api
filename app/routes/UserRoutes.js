var User = require('../models/user.js');
var authConfig = require('../config/auth.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var Utils = require('../modules/Utils.js');
var extend = require('extend');

module.exports = function(router, passport) {

    router.route('/signup')
    .get(function(req, res) {
        res.json({});
    })
    .post(function(req, res) {
        //create user1
    });

    router.route('/login')
    .get(function(req, res) {
        res.json({});
    })
    .post(function(req, res, next) {


        passport.authenticate('local', function(err, user, info) {
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

            var token = jwt.encode({email: user.email}, authConfig.jwtTokenSecret);
            console.log(token);
            res.json({
                meta: {
                    token: token
                }
            });
        })(req, res, next);
        
    });

    router.route('/users')
    .get(function(req, res) {
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
    })
    .post(passport.authenticate('local-signup', {
        session: false,
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }))
    /*.post(function(req, res) {

        User.findOne({ 'email': req.body.email }, function(err, user) {
            if (err) {
                return res.status(500).json(err);
            }

            if (user) {
                return res.status(400).json({
                    error: 'That email is already registered.'
                });
            }
            else {
                var user = new User();
                extend(user, req.body);
                user.password = Utils.generateHash(req.body.password);

                user.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    return res.status(201).json({
                        data: {
                            users: [user]
                        }
                    });
                });
            }
        });
    });*/

    router.route('/users/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
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
    })
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
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
    })
    .delete(function(req, res) {
        res.status(403);
        res.json({
            meta: {
                error: 'No.'
            }
        })
    });

    return router;

};