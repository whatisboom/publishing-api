var User = require('../models/user.js');
var authConfig = require('../config/auth.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var Utils = require('../modules/Utils.js');
var extend = require('extend');

module.exports = function(router, passport) {

    router.route('/register')
    .get(function(req, res) {
        res.json({});
    })
    .post(passport.authenticate('local-signup', {
        session: false,
        successRedirect: '/dashboard',
        failureRedirect: '/register'
    }));;

    router.route('/login')
    .get(function(req, res) {
        res.json({});
    })
    .post(function(req, res, next) {


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
            console.log(token);
            res.json({
                meta: {
                    token: token
                }
            });
        })(req, res, next);
        
    });

    router.route('/users')
    .get(Utils.requireRole('user'), function(req, res) {
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
    .put([Utils.restrictToOwn(), Utils.requireRole('user')], function(req, res) {
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
    .delete(Utils.requireRole('admin'), function(req, res) {
        res.json({
            meta: {
                error: 'No.'
            }
        })
    });

    return router;

};